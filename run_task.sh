#!/usr/bin/env sh
set -u

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ENVS="$ROOT/envs"
TASKS="$ROOT/tasks"
TMP_ROOT="${TMPDIR:-/tmp}/realistic-code-bench.$$"
NODE_MODULES_LOCK=""

usage() {
  cat <<'USAGE'
Usage:
  sh run_task.sh t139
  sh run_task.sh t139 t140
  sh run_task.sh '[t139,t140]'
  sh run_task.sh '["t139","t140"]'
USAGE
}

cleanup() {
  rm -rf "$TMP_ROOT"
  rm -rf "$ENVS"/.run_tmp.*."$$"
  if [ -n "${NODE_MODULES_LOCK:-}" ]; then
    rmdir "$NODE_MODULES_LOCK" 2>/dev/null
  fi
}

trap cleanup EXIT INT TERM
mkdir -p "$TMP_ROOT"

if [ "$#" -eq 0 ] || [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 2
fi

if [ ! -f "$ENVS/.env" ]; then
  sh "$ENVS/init_env.sh" "$ENVS/.env" >/dev/null
fi

. "$ENVS/.env"

: "${NPM_CACHE:=$ENVS/.cache/npm}"
: "${MAVEN_LOCAL_REPO:=$ENVS/.cache/m2}"

PASS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

record() {
  status=$1
  task=$2
  lang=$3
  out=${4:-}

  printf '%s %s %s\n' "$status" "$task" "$lang"
  case "$status" in
    PASS) PASS_COUNT=$((PASS_COUNT + 1)) ;;
    FAIL)
      FAIL_COUNT=$((FAIL_COUNT + 1))
      if [ -n "$out" ] && [ -s "$out" ]; then
        sed 's/^/  /' "$out" | tail -n 80
      fi
      ;;
    SKIP) SKIP_COUNT=$((SKIP_COUNT + 1)) ;;
  esac
}

ensure_node_modules() {
  env_dir=$1
  task=$2
  lang=$3
  out="$TMP_ROOT/${task}-${lang}-install.out"
  modules=""

  case "$lang" in
    javascript) modules=${JAVASCRIPT_NODE_MODULES:-} ;;
    typescript) modules=${TYPESCRIPT_NODE_MODULES:-} ;;
  esac

  if [ -d "$env_dir/node_modules" ]; then
    return 0
  fi

  lock="$env_dir/.node_modules.lock"
  waited=0
  while ! mkdir "$lock" 2>/dev/null; do
    if [ -d "$env_dir/node_modules" ]; then
      return 0
    fi
    waited=$((waited + 1))
    if [ "$waited" -ge 300 ]; then
      printf 'Timed out waiting for %s\n' "$lock" >"$out"
      record FAIL "$task" "$lang-install" "$out"
      return 1
    fi
    sleep 1
  done
  NODE_MODULES_LOCK=$lock

  if [ -d "$env_dir/node_modules" ]; then
    rmdir "$lock"
    NODE_MODULES_LOCK=""
    return 0
  fi

  if [ -n "$modules" ] && [ -d "$modules" ]; then
    ln -s "$modules" "$env_dir/node_modules" >"$out" 2>&1
    rc=$?
    rmdir "$lock"
    NODE_MODULES_LOCK=""
    if [ "$rc" -ne 0 ]; then
      record FAIL "$task" "$lang-install" "$out"
    fi
    return "$rc"
  fi

  mkdir -p "$NPM_CACHE"
  (
    cd "$env_dir" &&
    "$NPM" ci --cache "$NPM_CACHE" ||
    "$NPM" install --cache "$NPM_CACHE"
  ) >"$out" 2>&1
  rc=$?
  rmdir "$lock"
  NODE_MODULES_LOCK=""
  if [ "$rc" -ne 0 ]; then
    record FAIL "$task" "$lang-install" "$out"
  fi
  return "$rc"
}

run_python() {
  task=$1
  dir="$TASKS/$task/python"
  out="$TMP_ROOT/$task-python.out"
  work="$TMP_ROOT/$task-python"

  if [ ! -f "$dir/answer.py" ] || [ ! -f "$dir/test.py" ]; then
    record SKIP "$task" python
    return
  fi

  mkdir -p "$work"
  cat "$dir/answer.py" > "$work/single_run.py"
  printf '\n' >> "$work/single_run.py"
  cat "$dir/test.py" >> "$work/single_run.py"
  [ -d "$ENVS/python/test_case" ] && ln -s "$ENVS/python/test_case" "$work/test_case"

  (cd "$work" && "$PYTHON" single_run.py) >"$out" 2>&1
  [ "$?" -eq 0 ] && record PASS "$task" python || record FAIL "$task" python "$out"
}

run_javascript() {
  task=$1
  dir="$TASKS/$task/javascript"
  env_dir="$ENVS/javascript"
  out="$TMP_ROOT/$task-javascript.out"
  work="$ENVS/.run_tmp.javascript.$task.$$"

  if [ ! -f "$dir/answer.js" ] || [ ! -f "$dir/test.js" ]; then
    record SKIP "$task" javascript
    return
  fi

  ensure_node_modules "$env_dir" "$task" javascript || return
  rm -rf "$work"
  mkdir -p "$work"
  if ! ln -s "$env_dir/node_modules" "$work/node_modules" >"$out" 2>&1; then
    rm -rf "$work"
    record FAIL "$task" javascript "$out"
    return
  fi
  cat "$dir/answer.js" > "$work/temp.test.js"
  printf '\n' >> "$work/temp.test.js"
  cat "$dir/test.js" >> "$work/temp.test.js"

  (
    cd "$work" &&
    "$NODE" "$env_dir/node_modules/jest/bin/jest.js" \
      --config "$env_dir/jest.config.js" \
      --rootDir "$work" \
      --cacheDirectory "$work/.jest-cache" \
      temp.test.js \
      --runInBand
  ) >"$out" 2>&1
  rc=$?
  rm -rf "$work"
  [ "$rc" -eq 0 ] && record PASS "$task" javascript || record FAIL "$task" javascript "$out"
}

run_typescript() {
  task=$1
  dir="$TASKS/$task/typescript"
  env_dir="$ENVS/typescript"
  out="$TMP_ROOT/$task-typescript.out"
  work="$ENVS/.run_tmp.typescript.$task.$$"

  if [ ! -f "$dir/answer.ts" ] || [ ! -f "$dir/test.ts" ]; then
    record SKIP "$task" typescript
    return
  fi

  ensure_node_modules "$env_dir" "$task" typescript || return
  rm -rf "$work"
  mkdir -p "$work"
  if ! ln -s "$env_dir/node_modules" "$work/node_modules" >"$out" 2>&1; then
    rm -rf "$work"
    record FAIL "$task" typescript "$out"
    return
  fi
  cat "$dir/answer.ts" > "$work/temp.test.ts"
  printf '\n' >> "$work/temp.test.ts"
  cat "$dir/test.ts" >> "$work/temp.test.ts"

  (
    cd "$work" &&
    "$NODE" "$env_dir/node_modules/jest/bin/jest.js" \
      --config "$env_dir/jest.config.js" \
      --rootDir "$work" \
      --cacheDirectory "$work/.jest-cache" \
      temp.test.ts \
      --runInBand \
      --coverage=false
  ) >"$out" 2>&1
  rc=$?
  rm -rf "$work"
  [ "$rc" -eq 0 ] && record PASS "$task" typescript || record FAIL "$task" typescript "$out"
}

package_path() {
  file=$1
  pkg=$(sed -n 's/^package[[:space:]]*\([A-Za-z0-9_.]*\);.*/\1/p' "$file" | head -n 1)
  if [ -n "$pkg" ]; then
    printf '%s' "$pkg" | tr . /
  fi
}

run_java() {
  task=$1
  dir="$TASKS/$task/java"
  out="$TMP_ROOT/$task-java.out"
  work="$TMP_ROOT/$task-java"

  if [ ! -f "$dir/Answer.java" ] || [ ! -f "$dir/Tester.java" ]; then
    record SKIP "$task" java
    return
  fi

  main_pkg=$(package_path "$dir/Answer.java")
  test_pkg=$(package_path "$dir/Tester.java")
  main_dir="$work/src/main/java/${main_pkg:-}"
  test_dir="$work/src/test/java/${test_pkg:-}"
  mkdir -p "$main_dir" "$test_dir"
  cp "$ENVS/java/pom.xml" "$work/pom.xml"
  cp "$dir/Answer.java" "$main_dir/Answer.java"
  cp "$dir/Tester.java" "$test_dir/Tester.java"

  (cd "$work" && "$MAVEN" -q -Dmaven.repo.local="$MAVEN_LOCAL_REPO" -Dtest=Tester test) >"$out" 2>&1
  [ "$?" -eq 0 ] && record PASS "$task" java || record FAIL "$task" java "$out"
}

run_cpp() {
  task=$1
  dir="$TASKS/$task/c&cpp"
  out="$TMP_ROOT/$task-cpp.out"
  exe="$TMP_ROOT/$task-cpp.exe"

  if [ ! -f "$dir/answer.cpp" ] || [ ! -f "$dir/test.cpp" ]; then
    record SKIP "$task" "c&cpp"
    return
  fi

  (
    cd "$ROOT" &&
    "$CXX" $CXXFLAGS \
      -DANSWER_CPP="\"$dir/answer.cpp\"" \
      -DTEST_CPP="\"$dir/test.cpp\"" \
      "$ENVS/c&cpp/answer_check.cpp" -o "$exe" &&
    "$exe"
  ) >"$out" 2>&1
  [ "$?" -eq 0 ] && record PASS "$task" "c&cpp" || record FAIL "$task" "c&cpp" "$out"
}

run_task() {
  task=$1
  case "$task" in
    t*) ;;
    *) task="t$task" ;;
  esac

  if [ ! -d "$TASKS/$task" ]; then
    record FAIL "$task" task-not-found
    return
  fi

  printf '\n== %s ==\n' "$task"
  run_python "$task"
  run_javascript "$task"
  run_typescript "$task"
  run_java "$task"
  run_cpp "$task"
}

ids=$(printf '%s\n' "$*" | sed "s/[][]/ /g; s/,/ /g; s/\"//g; s/'//g")

for id in $ids; do
  run_task "$id"
done

printf '\nSummary: PASS=%s FAIL=%s SKIP=%s\n' "$PASS_COUNT" "$FAIL_COUNT" "$SKIP_COUNT"
[ "$FAIL_COUNT" -eq 0 ]

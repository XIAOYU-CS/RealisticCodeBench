# Java Env

Place task files at `src/main/java/org/real/temp/Answer.java` and `src/test/java/org/real/temp/Tester.java`, then run:

```sh
. ../.env
"$MAVEN" -Dmaven.repo.local="$MAVEN_LOCAL_REPO" -Dtest=Tester test
```

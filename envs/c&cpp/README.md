# C/C++ Env

Compile the wrapper with task paths passed as macros:

```sh
. ../.env
"$CXX" $CXXFLAGS \
  -DANSWER_CPP='"../../tasks/t139/c&cpp/answer.cpp"' \
  -DTEST_CPP='"../../tasks/t139/c&cpp/test.cpp"' \
  answer_check.cpp -o /tmp/answer_check
/tmp/answer_check
```

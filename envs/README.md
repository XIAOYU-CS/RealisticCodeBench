# Final Realistic Code Bench Envs

Generate local tool paths before running language envs:

```sh
sh init_env.sh
. ./.env
```

The generated `.env` is machine-local and ignored by git. Edit it if Python, Node, Maven, or the C++ compiler is not on `PATH`.

Prefer `../run_task.sh` from the bench root. Use these language subdirectories only as clean workspaces; do not vendor `node_modules`, Maven `target`, coverage, executables, or precompiled headers.

import os
from pathlib import Path


class WorkdirManager:
    def get_current_workdir(self) -> Path:
        current_workdir = Path.cwd()
        return current_workdir.resolve()

    def set_wordkir(self, workdir: str):
        built_workdir = self.build_workdir(workdir)
        os.chdir(built_workdir)

    def build_workdir(self, workdir: str) -> Path:
        current_workdir = self.get_current_workdir()
        target_dir = current_workdir / workdir
        if not target_dir.exists():
            raise FileNotFoundError(f"Path {target_dir} does not exist")
        return target_dir.resolve()


workdir_manager = WorkdirManager()

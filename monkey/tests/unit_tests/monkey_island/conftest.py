import os

import pytest


@pytest.fixture(scope="module")
def server_configs_dir(data_for_tests_dir):
    return os.path.join(data_for_tests_dir, "server_configs")


@pytest.fixture(scope="module")
def test_server_config(server_configs_dir):
    return os.path.join(server_configs_dir, "test_server_config.json")
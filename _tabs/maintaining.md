---
layout: page
title: Maintaining
icon: fas fa-toolbox
order: 3
permalink: /maintaining/
---

Projects I maintain or co-maintain. For the Open edX packages I am the named owner in each repository's `catalog-info.yaml`; releases go to PyPI. Badges are live.

| Project | What it is | Python | Release | Last commit | Monthly downloads |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [OSSvitals](https://github.com/UsamaSadiq/OSSvitals) | Daily repository health grades for open-source organisations; [live](https://ossvitals.org) | | | [![Last commit](https://img.shields.io/github/last-commit/UsamaSadiq/OSSvitals?style=flat-square&label=)](https://github.com/UsamaSadiq/OSSvitals/commits) | |
| [django-config-models](https://github.com/openedx/django-config-models) | Django configuration models with history and auditing | [![Python versions](https://img.shields.io/pypi/pyversions/django-config-models.svg?style=flat-square&label=)](https://pypi.org/project/django-config-models/) | [![PyPI](https://img.shields.io/pypi/v/django-config-models?style=flat-square&label=)](https://pypi.org/project/django-config-models) | [![Last commit](https://img.shields.io/github/last-commit/openedx/django-config-models?style=flat-square&label=)](https://github.com/openedx/django-config-models/commits) | [![Downloads](https://static.pepy.tech/personalized-badge/django-config-models?period=monthly&units=ABBREVIATION&right_color=GREEN&left_text=%E2%A4%93)](https://pepy.tech/projects/django-config-models) |
| [django-user-tasks](https://github.com/openedx/django-user-tasks) | User-triggered asynchronous tasks for Django | [![Python versions](https://img.shields.io/pypi/pyversions/django-user-tasks.svg?style=flat-square&label=)](https://pypi.org/project/django-user-tasks/) | [![PyPI](https://img.shields.io/pypi/v/django-user-tasks?style=flat-square&label=)](https://pypi.org/project/django-user-tasks) | [![Last commit](https://img.shields.io/github/last-commit/openedx/django-user-tasks?style=flat-square&label=)](https://github.com/openedx/django-user-tasks/commits) | [![Downloads](https://static.pepy.tech/personalized-badge/django-user-tasks?period=monthly&units=ABBREVIATION&right_color=GREEN&left_text=%E2%A4%93)](https://pepy.tech/projects/django-user-tasks) |
| [edx-rest-api-client](https://github.com/openedx/edx-rest-api-client) | Authenticated REST client for Open edX services | [![Python versions](https://img.shields.io/pypi/pyversions/edx-rest-api-client.svg?style=flat-square&label=)](https://pypi.org/project/edx-rest-api-client/) | [![PyPI](https://img.shields.io/pypi/v/edx-rest-api-client?style=flat-square&label=)](https://pypi.org/project/edx-rest-api-client) | [![Last commit](https://img.shields.io/github/last-commit/openedx/edx-rest-api-client?style=flat-square&label=)](https://github.com/openedx/edx-rest-api-client/commits) | [![Downloads](https://static.pepy.tech/personalized-badge/edx-rest-api-client?period=monthly&units=ABBREVIATION&right_color=GREEN&left_text=%E2%A4%93)](https://pepy.tech/projects/edx-rest-api-client) |
| [pytest-repo-health](https://github.com/openedx/pytest-repo-health) | pytest plugin that runs repository health checks | [![Python versions](https://img.shields.io/pypi/pyversions/pytest-repo-health.svg?style=flat-square&label=)](https://pypi.org/project/pytest-repo-health/) | [![PyPI](https://img.shields.io/pypi/v/pytest-repo-health?style=flat-square&label=)](https://pypi.org/project/pytest-repo-health) | [![Last commit](https://img.shields.io/github/last-commit/openedx/pytest-repo-health?style=flat-square&label=)](https://github.com/openedx/pytest-repo-health/commits) | [![Downloads](https://static.pepy.tech/personalized-badge/pytest-repo-health?period=monthly&units=ABBREVIATION&right_color=GREEN&left_text=%E2%A4%93)](https://pepy.tech/projects/pytest-repo-health) |
| [edx-repo-health](https://github.com/openedx/edx-repo-health) | The health checks every Open edX repository is scored on; the data source behind OSSvitals | | | [![Last commit](https://img.shields.io/github/last-commit/openedx/edx-repo-health?style=flat-square&label=)](https://github.com/openedx/edx-repo-health/commits) | |

## Ecosystem work

Beyond the packages above, most of my open-source time goes to maintenance that spans many repositories at once:

- Python 3.8 to 3.12 and Django 3.2 to 4.2 to 5.2 upgrades across 150+ Open edX repositories, with reusable codemods
- Travis CI, Jenkins and CircleCI to GitHub Actions migrations, with self-hosted autoscaling runners on EKS
- 678 merged pull requests across 95 `openedx` repositories and 4,400+ pull requests reviewed
- Member of the Open edX Maintenance Working Group and the edx-platform Working Group

## Upstream, outside Open edX

Fixes that the upgrade work surfaced in the wider Python ecosystem, and reports from running open-source apps in production. The full list, including open issues and pull requests awaiting review, is on a [public GitHub project board](https://github.com/users/UsamaSadiq/projects/1) that updates as they merge:

- [tox](https://github.com/tox-dev/tox/pull/1682) and [virtualenv](https://github.com/pypa/virtualenv/pull/1953): `importlib-metadata` constraints (2020)
- [algoliasearch-django](https://github.com/algolia/algoliasearch-django/pull/316) and [django-cache-memoize](https://github.com/peterbe/django-cache-memoize/pull/51): Django 3.2 test matrices (2021)
- [swagger2rst](https://github.com/Arello-Mobile/swagger2rst/pull/11): PyYAML `FullLoader` fix (2021)
- [python-cloudflare](https://github.com/cloudflare/python-cloudflare/pull/156): drop the `future` dependency (2023)
- [Penpot](https://github.com/penpot/penpot/issues/12622): backend database pool default regression, reported (2026)

# sns-telegram-bot
Telegram transport for SNS notifications.

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]
[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
  - [Community Bot](#community-bot)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

Clone sources from GitHub, and install modules:

```bash
  git clone git@github.com:pustovitDmytro/sns-telegram-bot.git
  cd sns-telegram-bot
  npm install
```

## Usage

pass configuration as env variables (.env files supported)

default values are in [.env.defaults](./.env.defaults)

run compiled version by:
```bash
  node lib/app.js
```
or sources by:
```bash
  npx babel-node runner.js
```

## API Documentation

Check api-blueprint and swagger in [docs folder](./docs) or [Github-pages](https://pustovitdmytro.github.io/sns-telegram-bot/api-blueprint)

## Community Bot 

If you don't want to self-deploy, just use community bot [@aws_sns_to_tg_bot](https://telegram.me/aws_sns_to_tg_bot). It does not store any data, so feel free to use it.

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/sns-telegram-bot
[github]: https://github.com/pustovitDmytro/sns-telegram-bot
[coveralls]: https://coveralls.io/github/pustovitDmytro/sns-telegram-bot?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/sns-telegram-bot.svg
[badge-vers]: https://img.shields.io/npm/v/sns-telegram-bot.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/sns-telegram-bot.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/sns-telegram-bot/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/sns-telegram-bot?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/sns-telegram-bot/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/sns-telegram-bot

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/sns-telegram-bot
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/sns-telegram-bot

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/sns-telegram-bot/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/sns-telegram-bot

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/sns-telegram-bot

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/sns-telegram-bot/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/sns-telegram-bot/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/sns-telegram-bot.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/sns-telegram-bot/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/sns-telegram-bot.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/sns-telegram-bot/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/8667aa23afaa4725854f098c4b5e8890
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/sns-telegram-bot/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/sns-telegram-bot&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_sns-telegram-bot&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_sns-telegram-bot

[npm-downloads-badge]: https://img.shields.io/npm/dw/sns-telegram-bot
[npm-size-badge]: https://img.shields.io/bundlephobia/min/sns-telegram-bot
[npm-size-url]: https://bundlephobia.com/result?p=sns-telegram-bot

[node-ver-test-badge]: https://github.com/pustovitDmytro/sns-telegram-bot/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/sns-telegram-bot/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fsns-telegram-bot.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fsns-telegram-bot?ref=badge_shield
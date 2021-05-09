FORMAT: 1A

# Health Check 

## Negative: Bad Route [GET /api/v1/agewash]

+ Request

+ Response 404 (application/json)
        
    + Body
         
        {}
        

## Positive: Health Check [GET /api/v1/health]

+ Request

+ Response 200 (application/json)
        
    + Body
         
        {}
        

## Positive: Get app info [GET /api/v1/info]

+ Request

+ Response 200 (application/json)
        
    + Body
         
        {
            "app": "sns-telegram-bot",
            "version": "1.2.0",
            "description": "Telegram transport for SNS notifications",
            "status": 1
        }
        
# Create Session 

## Positive: on add to channel [POST /api/v1/updates/test_webhook_url]

+ Request
 
    + Body
        
        {
            "update_id": 990200836,
            "message": {
                "message_id": 29,
                "from": {
                    "id": 238585423,
                    "is_bot": false,
                    "first_name": "Дмитро",
                    "last_name": "Пустовіт",
                    "username": "dimapustovit",
                    "language_code": "ru"
                },
                "chat": {
                    "id": -389952175,
                    "title": "smallest stove",
                    "type": "group",
                    "all_members_are_administrators": true
                },
                "date": 1581980648,
                "new_chat_participant": {
                    "id": 982462515,
                    "is_bot": true,
                    "first_name": "sns_bot",
                    "username": "aws_sns_to_tg_bot"
                },
                "new_chat_member": {
                    "id": 0,
                    "is_bot": true,
                    "first_name": "sns_bot",
                    "username": "aws_sns_to_tg_bot"
                },
                "new_chat_members": [
                    [
                        {
                            "id": 982462515,
                            "is_bot": true,
                            "first_name": "sns_bot",
                            "username": "aws_sns_to_tg_bot"
                        }
                    ]
                ]
            }
        }

+ Response 200 (application/json)
        
    + Body
         
        {
            "status": 1
        }
        
# Confirm SNS Subscriptions 

## Positive: confirm [POST /api/v1/sns/gDXvh1KU5GnHKgf12GvAt94I5PvxtpbaKqJOeC9zgUBldBRBAX9CcYTNHtKaUXz3gLd7oJJtzeKdOC4bbRmKBfrPN]

+ Request
 
    + Body
        
        {
            "Type": "SubscriptionConfirmation",
            "MessageId": "a4b9d4f5-1b3c-4161-b324-a368acc41984",
            "Token": "xmPoChg5EjuIcErB8jhXGkveLBTsB",
            "TopicArn": "5ASJ1KRCKUm8aVUi",
            "Message": "You have chosen to subscribe to the topic 5ASJ1KRCKUm8aVUi.\nTo confirm the subscription, visit the SubscribeURL included in this message.",
            "SubscribeURL": "https://sns.eu-central-1.amazonaws.com/?Action=ConfirmSubscription&TopicArn=5ASJ1KRCKUm8aVUi&Token=xmPoChg5EjuIcErB8jhXGkveLBTsB",
            "Timestamp": "2020-03-11T10:19:06.993Z",
            "SignatureVersion": "1",
            "Signature": "Pp34koavWLKw7jYKoD28oCGffmlOVSFMiJe70+sxyQTgIhNtgsBKq0NBoEldJZHKzte1Nl8W5D0k54x4RRI5Pj5gzwGepUB78MDX2bp5E3lakY/RODoEZAmpffFI1VoIn5grrfIBmLY6nx1gMidhv5dgCkgGCs8B5Lo37bbIrIn/7Rewdr0NPO1Lzu1FfZlIQ2pZ8xjwCJhb8HCXI6TI3aLGIYlTr59RVBjW3UsxhyJlhgPCWPp/0F62ljglWnK7bNh6K9MmTcX483EvOsFh5p1AdBuXtEe5v6JWvqFcml6z00tfTKpUVfyrBdRkirgVHSlFeCBRic244N5a00Vb8Q==",
            "SigningCertURL": "https://sns.eu-central-1.amazonaws.com/SimpleNotificationService-a86cb10b4e1f29c941702d737128f7b6.pem"
        }

+ Response 200 (application/json)
        
    + Body
         
        {
            "status": 1
        }
        
# Receive SNS event 

## Positive: receive event [POST /api/v1/sns/cS7mrFdslAl6M2ZVPRTqlhbpDDRgX9b70yEOIABnlBeTmCSNndNlHgtL63jz21bKKvjS14k0xp3D38gBcnQT85YZZ]

+ Request
 
    + Body
        
        {
            "AlarmName": "cis-console_auth_failures",
            "AlarmDescription": "Monitoring failed console logins may decrease lead time to detect an attempt to brute force a credential, which may provide an indicator, such as source IP, that can be used in other event correlation.",
            "AWSAccountId": "767580808008",
            "NewStateValue": "ALARM",
            "NewStateReason": "Threshold Crossed: 1 out of the last 1 datapoints [3.0 (13/02/20 10:23:00)] was greater than or equal to the threshold (1.0) (minimum 1 datapoint for OK -> ALARM transition).",
            "StateChangeTime": "2020-02-13T10:28:28.089+0000",
            "Region": "EU (Frankfurt)",
            "OldStateValue": "OK",
            "Trigger": {
                "MetricName": "console authentication failures",
                "Namespace": "CIS",
                "StatisticType": "Statistic",
                "Statistic": "SUM",
                "Unit": null,
                "Dimensions": [],
                "Period": 300,
                "EvaluationPeriods": 1,
                "ComparisonOperator": "GreaterThanOrEqualToThreshold",
                "Threshold": 1,
                "TreatMissingData": "- TreatMissingData:  notBreaching",
                "EvaluateLowSampleCountPercentile": ""
            }
        }

+ Response 200 (application/json)
        
    + Body
         
        {
            "status": 1
        }
        

## Event Table

|Events|
|id|string primarykey|
|name|string|
|poster|file(.jpg,.png)|
|otherImages|file[5](.jpg,.png)|
|date|dateTime|
|venue|string|
|details|file(.md)|
|fee|number|
|feeType|enum('perperson','perteam')|
|maxTeamSize|number|
|minTeamSize|number|
|owner|ref(user)|

## EventTag Table

|EventTag|
|event|ref(event)|
|tag|string|

## Users Table

|Users|
|email|string primarykey|
|name|string|
|profile|file(.jpg,.png)|
|bio|string|

## Participation Table

|Participation|
|participant|ref(user)|
|event|ref(event)|
|confirmed|boolean|
|teamId|string|
PRIMARY KEY (userId, eventId)

## Team Table

|id|string primarykey|
|teamLead|ref(user)|
|event|rel(event)|
|name|string|
|profile|file(.jpg,.png)|

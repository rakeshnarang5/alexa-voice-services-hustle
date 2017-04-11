exports.handler = (event, context) => {

    var action;
    var scenename;
    var device;
    var location;

    switch (event.request.type) {

        case "LaunchRequest":
            context.succeed(
                generateResponse(
                    buildSpeechletResponse("Hi! This is your interactive lighting model. What do you want to do?", false), {}
                )
            );
            break;

        case "IntentRequest":

            switch (event.request.intent.name) {
                case "NameOfTheAction":
                    action = event.request.intent.slots.ActionSetting.value;
                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse("Sure. What do you want to name the scene", false), {}
                        )
                    );
                    break;

                case "NameOfTheScene":
                    scenename = event.request.intent.slots.SceneNameSetting.value;
                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse("Which device do you want to add to scene name " + scenename, false), {}
                        )
                    );
                    break;

                case "NameOfTheDevice":
                    device = event.request.intent.slots.DeviceNameSetting.value;
                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse("Which location do you want to add to scene name " + scenename, false), {}
                        )
                    );
                    break;

                case "NameOfTheLocation":
                    location = event.request.intent.slots.LocationSetting.value;
                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse("Success!" + scenename + " has been " + action + "ed! It has " + device + " of the " + location, true), {}
                        )
                    );
                    break;
            }

    }
};

buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };
};

generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};
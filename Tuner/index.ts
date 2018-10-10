import { HandlerInput, SkillBuilders } from 'ask-sdk-core';
import { IntentRequest, SessionEndedRequest } from 'ask-sdk-model';

const LaunchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('LaunchRequestHandler　canHandle');
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        const title = '音チューナー';
        const text = 'こんにちは。なんの音が欲しいですか？';
        return handlerInput.responseBuilder
            .speak(text)
            .reprompt(text)
            .withSimpleCard(title, text)
            .getResponse();
    }
};

const TunerIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('TunerIntentHandler　canHandle');
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
             && handlerInput.requestEnvelope.request.intent.name === 'Tuner';
    },
    async handle(handlerInput: HandlerInput) {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const slot = request.intent.slots!![ 'tune' ];
        console.log(slot)
        const resolution = slot.resolutions!!.resolutionsPerAuthority!!.find(resolution => {
            return resolution.status.code === 'ER_SUCCESS_MATCH';
        })!!;

        const code = resolution.values[ 0 ].value.id;    
        console.log(code)

        const title = '音チューナー';
        const text = `<speak>${code}ですね。<audio src="https://s3-ap-northeast-1.amazonaws.com/tuner-files/A.mp3" /></speak>`;

        // const speech = "outputSpeech": {
        //     "type": "SSML",
        //     "ssml": "<speak><audio src="https://s3-ap-northeast-1.amazonaws.com/tuner-files/A.mp3" /></speak>"
        // }

        return handlerInput.responseBuilder
            .speak(text)
            .withSimpleCard(title, text)
            .withShouldEndSession(false)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('HelpIntentHandler　canHandle');
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput) {
        const title = '音チューナー';
        const text = 'Aの音をちょうだいと言ってみてください';
        return handlerInput.responseBuilder
            .speak(text)
            .reprompt(text)
            .withSimpleCard(title, text)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('CancelAndStopIntentHandler　canHandle');

        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput: HandlerInput) {
        const title = '音チューナー';
        const text = 'ご利用ありがとうございました。';
        return handlerInput.responseBuilder
            .speak(text)
            .withSimpleCard(title, text)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('SessionEndedRequestHandler　canHandle');

        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput) {
        const request = handlerInput.requestEnvelope.request as SessionEndedRequest;
        console.log(`Session ended with reason: ${request.reason}`);
        // SessionEndedRequest では音声／カード／ディレクティブなどの返答は出来ないが
        // 何か後処理が必要な場合はここで
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error) {
        console.log('ErrorHandler　canHandle');
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('すみません。もう一度おっしゃってみてください。')
            .reprompt('すみません。もう一度おっしゃってみてください。')
            .withShouldEndSession(true)
            .getResponse();
    }
};

const skillBuilder = SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        TunerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();

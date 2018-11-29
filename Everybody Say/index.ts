import { HandlerInput, SkillBuilders } from 'ask-sdk-core';
import { IntentRequest, SessionEndedRequest } from 'ask-sdk-model';

const LaunchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('LaunchRequestHandler　canHandle');
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        const title = 'エビバディセイ';
        // const ssmlText = `<speak><prosody volume="x-loud"><emphasis level="strong"><prosody pitch="low" rate="fast"><phoneme alphabet="ipa" ph="héi">Hey</phoneme> <phoneme alphabet="ipa" ph="jóu">Yo</phoneme>.<phoneme alphabet="ipa" ph="hwʌts">Whats</phoneme> <phoneme alphabet="ipa" ph="ʌ́p">up</phoneme> <phoneme alphabet="ipa" ph="mén">men</phoneme>?</prosody></emphasis></prosody><break time="3s"/><emphasis></emphasis></speak>`;
        const ssmlText = `<speak><prosody pitch="low" rate="fast"><emphasis level="strong">Hey Yo What's up men?</emphasis></prosody></speak>`;

        const response =  handlerInput.responseBuilder
        .withSimpleCard(title, 'Hey Yo. Whats up men?')
        .withShouldEndSession(false)
        .getResponse();

        response.outputSpeech = {
            "type" : "SSML",
            "ssml" : ssmlText
        }    

        return response;
}
};

const EverybodySayIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
             && handlerInput.requestEnvelope.request.intent.name === 'everybodysay';
    },
    async handle(handlerInput: HandlerInput) {

        console.log('handle');
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        console.log(request);
        const slot = request.intent.slots![ 'say' ];
        console.log(slot);
        const title = 'エビバディセイ'
        if ( slot.value == null ) {
            const ssmlText = `<speak><emphasis level="strong"><prosody pitch="x-high">Hey Yo. What's up men?</prosody></emphasis></speak>`;

            const response =  handlerInput.responseBuilder
            .withSimpleCard(title, `Hey Yo. What's up men?`)
            .withShouldEndSession(false)
            .getResponse();

            response.outputSpeech = {
                "type" : "SSML",
                "ssml" : ssmlText
            }    

            return response;
        } else {
            const text = `もう終わりですか？`
            const ssmlText = `<speak><emphasis level="strong"><prosody pitch="x-high">${slot.value}</prosody></emphasis><break time="3s"/>${text}</speak>`;
            //volume="x-loud" 
            const response = handlerInput.responseBuilder
            // .speak(text)
            .withSimpleCard(title, text)
            .withShouldEndSession(false)
            .getResponse();

            response.outputSpeech = {
                "type" : "SSML",
                "ssml" : ssmlText
            }    

            return response;
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        console.log('HelpIntentHandler　canHandle');
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput) {
        const title = 'エビバディセイ';
        const text = 'お前のコールに対してイカしたレスポンスをするぜ！とりあえずセイほーと言ってみな！';
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
        const title = 'エビバディセイ';
        const text = 'センキュー';
        const ssmlText = `<speak><emphasis level="strong"><prosody pitch="x-high">センキュー</prosody></emphasis></speak>`;

        const response = handlerInput.responseBuilder
            // .speak(text)
            .withSimpleCard(title, text)
            .getResponse();

            response.outputSpeech = {
                "type" : "SSML",
                "ssml" : ssmlText
            }    

        return response;
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
            .speak('ワッツアップ　メン')
            .withSimpleCard("エビバディセイ","（すいません。もう一度おっしゃってみてください。）")
            .getResponse();
    }
};

const skillBuilder = SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        EverybodySayIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();

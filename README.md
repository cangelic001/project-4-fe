# Mentai Log 

Placeholder for screenshot/logo

## Description

During the ideation period, we knew that we wanted to incorporate some sort of AI technology into our app. 
Initially, we wanted to something with visionAI either video or image but we feared that it would take too much time, effort and money hence, we decided to go with something simple like sentiment analysis technology which is quite mature by now. 

This is a journal app, not quite a mental health app. We thought doing a full mental health app would be too sensitive and risk with mistakes and errors would be too great hence, we decided to go with a simple journal app with sentiment analysis for self monitoring. The name reflects the playful nature of the app with a play on mental health and a popular food item: mentai. 

Essentially, the user logs a written journal everyday. The app analyses the journal for emotions such as joy, sadness etc, sentiment, keywords and entities. These are stored in the database and is presented as a visualisation in the user's dashboard back to the user. This way, the user can monitor their mood and things that are bothering them.

The way we analyse the text is through IBM Watson Natural Language Understanding system. It is a system that uses deep learning to extract meaning and metadata from unstrucuted text data and is one of the earlier models that provided specialised text analysis capabilities before the emergence of modern large language models (LLMs). It was developed to perform targeted natural langauge processing tasks such as extract sentiments, emotions, entities, keywords, categories etc. It represents an early approach to practical AI that focused on solving specific langugage tasks rather than attempting general language understanding. Before the current generation of LLMs, these services represented the state-of-the-art tech. 

Other considerations were cost, reliability in terms of consistent results since we are performing a specific task, structured outputs.

## Project Planning Deliverable

- Project planning link : https://trello.com/b/Z9Le2R5e/project3

## Github Repo Deliverables

- Front-end GitHub repo link : https://github.com/cangelic001/react-mentai-log-front-end
- Back-end GitHub repo link : https://github.com/umeshroka/express-api-mentai-log-back-end

## Deployed App Link Deliverable

- Deployed front-end project link : https://react-mentai-log-front-end.vercel.app
- Deployed back-end project link : https://express-api-journal-back-end.onrender.com

## Attributions

- IBM Watson Natural Language Understanding: https://www.ibm.com/products/natural-language-understanding
- React Charts: https://react-chartjs-2.js.org/

## Technologies Used

HTML + CSS + Javascript + React + Node.js + Express

## Stretch Goals

Incorporate search in the loglist. Allows the user to look back and search for logs.

We want to have dynamic feedback to the user based on their mood trends using LLM which has been prompted to provide safe, proven and professional advice. Or we can hardcode some feedback.

It would be good if we could give the user an option to do video journalling on top of the text journalling. This way, the user can choose the medium that they are most comfortable with. Video journalling would be superior for us because we could potentially monitor the facial features to extract sentiments because pictures paint a better picture than what people say or write. But this would involve a lot of work because it entails incorporating visionAI as well as speech to text. Not sure if we have the skillset to do this yet. 

## Reflections

### Favourite Code

```
const response = await nlu.analyze({
      text: text,
      features: {
        emotion: { document: true },
        entities: { limit: 1},
        keywords: { limit: 1},
        sentiment: { document: true},
      },
    });

```

### Can do better

Maybe at the start when the user is logged in, dont show the charts and dashboard. maybe check if the user has logged today and if not, prompt him to log. then the dashboard is just a link. or maybe show just one line chart in order to not overwhelm the user. then shows the other charts in another dashboard page. 


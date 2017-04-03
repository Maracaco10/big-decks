import cheerio from 'cheerio';
import {getEvents} from './events';
import {getDecks, getDeck} from './decks';
import {toDeckFormat} from './dckFormat';
import {mtgtop8} from './mtgtop8';

mtgtop8({}, (standardEventPage) => {
  let allDecks = [];
  let $ = cheerio.load(standardEventPage);
  let events = getEvents($);
  events.forEach(eventPath => mtgtop8({path: eventPath}, (eventPage) => {
    let $eventPage = cheerio.load(eventPage);
    let decks = getDecks($eventPage);
    decks.forEach(deckPath => {
      mtgtop8({path: deckPath}, (deckPage)=> mtgtop8({path: getDeck(cheerio.load(deckPage))}, (deckFile) => {
        toDeckFormat(deckFile);
      }));
    });
  }));
});
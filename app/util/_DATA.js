export function _getBooks () {
  return new Promise( (res, rej) =>{
    setTimeout(()=>res(books), 1000)
  })
}

export function _getLectionary() {
  return new Promise( (res, rej) =>{
    setTimeout( ()=>res(lectionary), 1000)
  })
}

export function _getPassage(slug=null){
  //console.log('getPassage from data:', slug)
  return new Promise( (res, rej) => {
    setTimeout(()=>res(passages[slug]), 1000)
  })
}

export function _getLexemes(){
  return new Promise( (res, rej) =>{
    setTimeout(()=>res(lexemes), 200)
  })
}

let passages= {
  'advent-C1/old-testament': {
    slug: 'advent-C1/old-testament',
    book: 'Jeremiah',
    chapter: '33',
    verses: '14-16',
    title: 'Old Testament',
    content: [
      `<p>Yahweh speaks:</p>
          <br />
          <p><em>Look up!</em><br />
              The day is coming when I will perform the Good,
              the Promise I made to Israel and Judah.
          </p>
          And on that day I will cause Justice to branch and flower
              for David who will see it yielded throughout the land.

          And on that day Judah will be given her freedom
              and Jerusalem her safety
                  and her name will be 'Yahweh, Our Justice.'`
    ],
    lexemes: []

  },

  'advent-C1/psalm': {
    slug: 'advent-C1/psalm',
    book: 'Psalm',
    chapter: '25',
    verses: '1-10',
    title: 'Psalm',
    content: [
      `Oh God, I lift up my soul and give it to you.

      Free me from my feelings of shame –
      deliver anyone who waits on you from their shame!
      leave self-hating to corruption and oppression

      Yahweh, unveil your Way to me
      illuminate your Path;
      lead me in truth and teach me,
      for you are the God of freedom
      and I am waiting for God.

      Be mindful of your mercy and of your love,
      for they have been from of old.

      Remember not the sins of my youth –
      Oh God, for the sake of Beauty,
      remember me in your love!

      For you are all Beauty and Justice,
      so instruct us in this Way,
      lead the humble toward what is right and good,

      Every road is mercy and truth
      for those who guard their alliance with God.`
    ],
    lexemes: []
  },

  'advent-C1/epistle': {
    slug: 'advent-C1/epistle',
    book: '1 Thessalonians',
    chapter: '3',
    verses: '9-13',
    title: 'Epistle',
    content: [
      `How could my thanks to God ever match the joy you bring me?

      I long night and day to finally see you face to face! I pray to God and our Teacher Jesus that I might see you soon and so meet anyneed your faith lacks.

      May the Lord amplify and nourish your love for one another — and for all human beings — just as I am so rich in love for you.

      May God strengthen your hearts with pure holiness at the coming of Jesus with all the saints.`
    ],
    lexemes: []
  },

  'advent-C1/gospel': {
    slug: 'advent-C1/gospel',
    book: 'Luke',
    chapter: '21',
    verses: '25-36',
    title: 'Gospel',
    content: [
      `And there will be signs in the sun, moon and stars, and on earth the abject panic of nations thrown into turmoil—people will faint dead to the ground when they see what’s happening in the world. You’ll see the `,
      11,
      ` coming on the clouds of the sky borne by spectacular, dynamic energy. And when all this starts to happen, stand tall with your heads raised, because your restoration is close at hand.

      When the fig tree sprouts its leaves you can see for yourself
      that summer is coming. In the same way when you see all this
      happening, you’ll know that `,
      12,
      ` is upon you.
      This will happen in your time—sky and earth will fall away, but
      my words will never die.

      So get a hold of yourself and WAKE UP. Pay attention that your
      hearts aren’t chained by drunkenness or stress; otherwise this
      day will hit you like a sprung trap. Because it will come, this
      day—it will come to everyone who lives on the face of the earth.

      Keep your hearts awake! And pray that you’ll have the strength
      to run the course of everything that will happen, and arrive to
      the Human Son still standing!`
    ],
    lexemes: [11, 12]
  },






  'luke/postdeath': {
    id: '5c9qojr2d1738zlx09afby',
    chapter: "1",
    verses: "4-12",
    title: "Postdeath",
    content: [
        "That's not for any of you to know. The time and its ",
        111,
        " have been ordered through our ",
        333,
        "'s ",
        222,
        ". But you will ",
        444,
        "when the Holy Spirit descends upon you and makes you children of the Father/Mother in heaven. ",
        "That's not for any of you to know. The time and its ",
        111,
        " have been ordered through our ",
        333,
        "'s ",
        222,
        ". But you will ",
        444,
        "when the Holy Spirit descends upon you and makes you children of the Father/Mother in heaven. ",
        "That's not for any of you to know. The time and its ",
        111,
        " have been ordered through our ",
        333,
        "'s ",
        222,
        ". But you will ",
        444,
        "when the Holy Spirit descends upon you and makes you children of the Father/Mother in heaven. ",
        "That's not for any of you to know. The time and its ",
        111,
        " have been ordered through our ",
        333,
        "'s ",
        222,
        ". But you will ",
        444,
        "when the Holy Spirit descends upon you and makes you children of the Father/Mother in heaven. "
    ],
    lexemes: [111, 222, 333, 444],
    slug: 'luke/postdeath'
  }
}


let lexemes= {
  11: {
    id: 11,
    primary: 'Human Son',
    original: 'Huios ton Anthropou',
    traditional: 'Literally "Son of Man"',
    cloud: ['Huios ton Anthropou', 'Son of Man', 'Human One'],
    description: 'Though a common enough idiom at that time, referring to kings and so forth, it had gained significance and weight in Judaism as referring specifically to the unknown and powerful prophetic figure that was to come, (cf. the book of Ezekiel, used over 90 times) and this is its meaning throughout the Bible. Jesus often referred to himself with this phrase. In addition the term carried the notion of the "the human archetype" – the fullness of the human being as God created her.'
  },
  12: {
    id: 12,
    primary: `God's kingdom`,
    original: `Basileias tou Theou`,
    traditional: `Kingdom of God`,
    cloud: [`Basileias tou Theou`,`the Kingdom of God`, `the Unseen Kingdom`,],
    description: `See Rom 14:17:
"God’s kingdom is not a matter of eating and drinking, but of justice, peace and joy
in the Holy Spirit."

See 2 Cor 4:18: "And so we look toward that which is unseen, for what is seen evanesces, but what is unseen is eternal."`
  },
  111: {
    id: 111,
    primary: 'fullness',
    cloud: ['opportune and fitting time', ],
    original: 'kairos',
    traditional: 'time',
    description: 'The first word, kronos, refers to chronological time. '
  },
  222: {
    id: 222,
    primary: 'exousia',
    cloud: ['flow', 'energy', 'unrestrained freedom of intentional action'],
    language: "greek",
    original: "exousia",
    traditional: '"authority" or "power"',
    description: "From <em>ek</em> (out from) and <em>eimi</em> (to be, Being). Literally, \"out from one's inner Being\""
  },
  333: {
    id: 333,
    primary: 'Creator',
    cloud: ['Originator', 'Creator', 'Source' ],
    original: 'Pater',
    traditiona: 'Father',
    description: 'Refers to Originator, Creator, Source; to Whom one is intimately connected and related to'
  },
  444: {
    id: 444,
    primary: 'actively receive',
    cloud: ['take hold of', 'accept with initiative' ],
    original: 'lambano',
    traditional: 'receive',
    description: 'From the root lab- which means to accept what is offered. The English receive is too passive.'
  }
}

function passageBuilder(chapter='1', verses='99-101', subtitle='', content=[]){
  passages.concat({
    id: generateUID(),
    chapter,
    verses,
    subtitle,
    content,
    slug: chapter+'_'+verses
  })
}


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


let books = [
  {
    title: 'Gospel of Luke',    //Collection
    slug: 'luke',
    sections: [
      {
        name: 'Incarnation',    //Section
        passages: [
          {
            title: 'Introduction',    //Passage
            slug: 'introduction',
            chapter: 1,
            verses: '1-8',
          },
          {
            title: 'Birth of Jesus',
            slug: 'birth-of-jesus',
            chapter: 1,
            verses: '9-31',
          },
          {
            title: 'Shepherds Visit',
            slug: 'shepherds-visit',
            chapter: 1,
            verses: '32-49',
          },
        ]
      },
    ]
  },
  {
    title: "Acts of the Apostles", //Collection
    slug: 'acts',
    sections: [
      {
        name: 'Church in Jerusalem',
        passages: [
          {
            title: 'Introduction',
            slug: 'introduction',
            chapter: 1,
            verses: '1-4',
          },
          {
            title: 'Ascension',
            slug: 'ascension',
            chapter: 1,
            verses: '5-16',
          },
          {
            title: 'Upper Room',
            slug: 'upper-room',
            chapter: 1,
            verses: '17-28',
          },
        ]
      },
      {
        name: 'Peter\'s Metanoia',
        passages: [
          {
            title: 'Peter\'s Vision',
            slug: 'peters-vision',
            chapter: 2,
            verses: '1-12',
          },
          {
            title: 'Peter & Cornelius',
            slug: 'peter-cornelius',
            chapter: 2,
            verses: '12-34',
          },
        ]
      }
    ]
  }
];


let lectionary= [
  { /* season */
    title: 'Advent Year C',
    slug: 'advent-C',
    sections: [
      { /* section */
        name: 'Advent 1',
        passages: [
          {
            title: 'Old Testament |   Jeremiah 33',
            slug: 'advent-C1/old-testament',
          },

          {
            title: 'Psalm |   Psalm 25',
            slug: 'advent-C1/psalm',
          },
          {
            title: 'Epistle |   1 Thessalonians 3',
            slug: 'advent-C1/epistle',
          },
          {
            title: 'Gospel |   Luke 21',
            slug: 'advent-C1/gospel',
          },
        ],
      },

      { /* section */
        name: 'Advent 2',
        passages: [
          {
            title: 'Isaiah 57',
            slug: 'advent2b-ot',
          },

          {
            title: 'Psalm 87',
            slug: 'advent2b-psalm',
          },
          {
            title: 'Romans 7',
            slug: 'advent2b-epistle',
          },
          {
            title: 'Matthew 27',
            slug: 'advent2b-gospel',
          },
        ],
      },

      { /* section */
        name: 'Advent 3',
        passages: [
          {
            title: 'Isaiah 58',
            slug: 'advent3b-ot',
          },

          {
            title: 'Psalm 88',
            slug: 'advent3b-psalm',
          },
          {
            title: 'Romans 8',
            slug: 'advent3b-epistle',
          },
          {
            title: 'Matthew 28',
            slug: 'advent3b-gospel',
          },
        ],
      }
    ]
  }, /* end Advent B season */

  /*
  {  // Lent Year B
    title: 'Lent Year B',
    slug: 'lentB',
    sections: [
      {
        title: 'Lent 1 - Year B',
        passages: [
          {
            title: 'Hosea 1',
            slug: 'lent1b-ot'
          },
          {
            title: 'Psalm 51',
            slug: 'lent1b-psalm'
          },
          {
            title: 'Colossians 1',
            slug: 'lent1b-epistles'
          },
          {
            title: 'Mark 1',
            slug: 'lent1b-gospel'
          },
        ]
      },
      {
        title: 'Lent 2 - Year B',
        passages: [
          {
            title: 'Hosea 2',
            slug: 'lent2b-ot'
          },
          {
            title: 'Psalm 52',
            slug: 'lent2b-psalm'
          },
          {
            title: 'Ephesians 1',
            slug: 'lent2b-epistles'
          },
          {
            title: 'Mark 2',
            slug: 'lent2b-gospel'
          },
        ]
      },
      {
        title: 'Lent 3 - Year B',
        passages: [
          {
            title: 'Micah 3',
            slug: 'lent3b-ot'
          },
          {
            title: 'Psalm 53',
            slug: 'lent3b-psalm'
          },
          {
            title: 'Philippians 2',
            slug: 'lent3b-epistles'
          },
          {
            title: 'Mark 3',
            slug: 'lent3b-gospel'
          },
        ]
      }
    ]
  } */
];


/*

[{
  title: Season1
  sections: [
  {
    title: Week 1
    passages: [{
      title: ot,
      slug: uid
    },
    {
      title: epistle,
      slug: uid
    },
    {
      title: gospel,
      slug: uid
    }
  },
  {
    title: Week 2
    passages: [{
      title: ot,
      slug: uid
    },
    {
      title: epistle,
      slug: uid
    },
    {
      title: gospel,
      slug: uid
    }
  },
  {
      title: Week 2,
      passages: [{

      }]
    }]
  --ot
  --psalm
  --gospel
  -Week 2
  --ot
  --psalm
  --gospel
  }]
},
{
  title: Season2
  -week 1
  --passage1
  --passage2
  --passage3
}]
*/

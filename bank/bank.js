// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The question bank, built by tools/build.mjs from passages written and
// checked by the pipeline in tools/ (docs/ITEM-BANK.md). Every passage and
// question is original to this app. Do not edit by hand: change the pipeline
// or the work files and build again. The routine, bands and worked examples
// below are kept from build to build and may be edited here.
//
// A sentence's index in a passage (counting across paragraphs, from 0) is how
// questions point at it; in a poem each string is a line. Each wrong option
// carries `why`: the one plain line a student reads after picking it.

var READING_BANK = {
 "version": "2026-11-17-26p40v",
 "routine": [
  "Read the question.",
  "Go back to the text.",
  "Find the sentence that shows it.",
  "Rule out the traps."
 ],
 "bands": [
  {
   "id": "b1",
   "to": 550
  },
  {
   "id": "b2",
   "to": 700
  },
  {
   "id": "b3",
   "to": 850
  },
  {
   "id": "b4",
   "to": 1000
  },
  {
   "id": "b5",
   "to": 1150
  },
  {
   "id": "b6",
   "to": 9999
  }
 ],
 "passages": [
  {
   "id": "b4-i01",
   "type": "informational",
   "genre": "article",
   "title": "A Show Without Its Star",
   "band": "b4",
   "topics": [
    "comets-asteroids",
    "astronomy",
    "space"
   ],
   "paragraphs": [
    [
     "Every year in mid-August, streaks of light flash across the night sky.",
     "This show is called the Perseid meteor shower, and it comes from a comet named Swift-Tuttle.",
     "Yet Swift-Tuttle last swung past the Sun in 1992 and will not return until 2126.",
     "So how can a comet that visits only once every 133 years put on a show every summer?"
    ],
    [
     "The answer lies in what a comet leaves behind.",
     "A comet is a ball of ice, rock, and dust that travels around the Sun.",
     "When it swings near the Sun, the heat turns some of its ice into gas.",
     "The escaping gas carries bits of dust away from the comet.",
     "These crumbs keep moving along the comet's path and spread out more with each trip.",
     "After thousands of trips, the comet's whole loop is lined with dust."
    ],
    [
     "Earth's own path around the Sun crosses that dusty loop in one place.",
     "We reach that spot around the middle of August each year.",
     "Whether the comet is near or far, its dust is already waiting there.",
     "The bits strike our air at great speed and burn up as bright streaks.",
     "Most of them are no bigger than a grain of sand."
    ],
    [
     "The show is not the same every year, though.",
     "Sometimes the giant planet Jupiter tugs on old dust and pulls it closer to Earth's path.",
     "In those years, watchers may see about twice as many streaks as usual."
    ]
   ],
   "items": [
    {
     "id": "b4-i01-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is the article mostly about?",
     "key": 3,
     "evidence": [
      3,
      12
     ],
     "options": [
      {
       "text": "why tiny bits of space dust glow so brightly in our sky",
       "trap": "detail",
       "why": "The article does say tiny bits glow, but that is one detail. Most of it explains the yearly show."
      },
      {
       "text": "why comets grow long, glowing tails as they near the Sun",
       "trap": "not-in-text",
       "why": "The article never talks about comet tails. Look at the question it asks in the first paragraph."
      },
      {
       "text": "why the Perseids show more streaks in some years than others",
       "trap": "too-narrow",
       "why": "Years with more streaks come up only in the last paragraph. The question asks about the whole article."
      },
      {
       "text": "why a shower returns each year though its comet rarely does"
      }
     ]
    },
    {
     "id": "b4-i01-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "According to the article, what can make the Perseids show more streaks in some years?",
     "key": 1,
     "evidence": [
      16,
      17
     ],
     "options": [
      {
       "text": "Earth passes through the dust more slowly in those years.",
       "trap": "not-in-text",
       "why": "The article never says Earth slows down. Reread the last paragraph to see what changes."
      },
      {
       "text": "Jupiter's pull moves old dust closer to Earth's path."
      },
      {
       "text": "Swift-Tuttle sheds fresh dust on its trip past the Sun.",
       "trap": "word-lift",
       "why": "The article says comets lose dust near the Sun, but it gives a different reason for years with more streaks."
      },
      {
       "text": "The Moon's pull bends the dust trail toward Earth.",
       "trap": "not-in-text",
       "why": "The article never mentions the Moon. Check the last paragraph for what pulls the dust."
      }
     ]
    },
    {
     "id": "b4-i01-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "text-structure",
     "prompt": "In what order does the article explain where the Perseids come from?",
     "key": 0,
     "evidence": [
      9,
      10
     ],
     "options": [
      {
       "text": "It first tells how dust spreads along the comet's path, then how Earth meets it."
      },
      {
       "text": "It first tells how Earth meets the dust, then how dust spreads along the comet's path.",
       "trap": "opposite",
       "why": "That is the reverse order. The second paragraph explains the dust before the third paragraph brings in Earth."
      },
      {
       "text": "It first tells how Jupiter moves the dust, then how Earth passes through it.",
       "trap": "word-lift",
       "why": "Jupiter does move dust, but that comes last in the article, after Earth meets the dust."
      },
      {
       "text": "It first tells how the dust burns up in our air, then where that dust comes from.",
       "trap": "opposite",
       "why": "The burning streaks are explained after the article tells where the dust comes from, not before."
      }
     ]
    },
    {
     "id": "b4-i01-4",
     "order": 4,
     "format": "multi",
     "area": "informational-craft",
     "skill": "evidence",
     "prompt": "Which two sentences show that the shower does not depend on the comet being close by? Pick two.",
     "keys": [
      3,
      4
     ],
     "evidence": [
      2,
      12
     ],
     "options": [
      {
       "text": "“Sometimes the giant planet Jupiter tugs on old dust and pulls it closer to Earth's path.”",
       "trap": "word-lift",
       "why": "This sentence says closer, but it is about Jupiter moving dust, not about where the comet is."
      },
      {
       "text": "“When it swings near the Sun, the heat turns some of its ice into gas.”",
       "trap": "true-but",
       "why": "This tells how a comet changes near the Sun, not whether the comet must be close for the show."
      },
      {
       "text": "“We reach that spot around the middle of August each year.”",
       "trap": "true-but",
       "why": "That's true, but it only tells when Earth reaches the dust, not where the comet is."
      },
      {
       "text": "“Yet Swift-Tuttle last swung past the Sun in 1992 and will not return until 2126.”"
      },
      {
       "text": "“Whether the comet is near or far, its dust is already waiting there.”"
      }
     ]
    },
    {
     "id": "b4-i01-5",
     "order": 5,
     "format": "sentence",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Tap the sentence that tells what must happen first, before bits of dust can be carried away from a comet.",
     "keys": [
      6
     ],
     "why": "Look in the paragraph that tells what a comet is made of, and find the change that comes before any dust leaves."
    }
   ],
   "level": 870
  },
  {
   "id": "b4-i02",
   "type": "informational",
   "genre": "article",
   "title": "The Internet Under the Sea",
   "band": "b4",
   "topics": [
    "internet",
    "computers",
    "technology"
   ],
   "paragraphs": [
    [
     "When you send a message to a friend in another country, it probably does not travel through space.",
     "Many people think satellites carry most internet data between continents.",
     "In fact, almost all of it moves through cables lying on the ocean floor."
    ],
    [
     "Far out at sea, where the water can be miles deep, a cable is about as thick as a garden hose.",
     "Inside are glass threads thinner than a hair, carrying messages as flashes of light.",
     "It needs little armor there, because anchors and fishing nets rarely reach so far down.",
     "Being thin also makes it light, so one ship can carry a very long stretch."
    ],
    [
     "Close to shore, cables are built very differently.",
     "Ships drop heavy anchors there, and fishing boats drag nets along the bottom.",
     "So these cables are wrapped in steel and buried under the sand."
    ],
    [
     "When a cable is damaged, a repair ship brings spare cable.",
     "In deep water, the crew first drags a hook that cuts the cable, since lifting a heavy loop from so deep could snap it.",
     "Another hook lifts one cut end onto the deck, where it is sealed and tied to a floating buoy.",
     "Next, the crew hauls up the other end and sends test signals from it to land.",
     "Then they join spare cable to it and sail back to the buoy for one last joint.",
     "Finally, the repaired cable is lowered to the seabed."
    ]
   ],
   "items": [
    {
     "id": "b4-i02-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this article mostly about?",
     "key": 0,
     "evidence": [
      2,
      9,
      10
     ],
     "options": [
      {
       "text": "Cables on the seafloor carry most internet messages and are guarded and fixed."
      },
      {
       "text": "Cables close to shore are wrapped in steel and buried under sand.",
       "trap": "detail",
       "why": "That's true, but it is one part of the article. The question asks about the whole thing."
      },
      {
       "text": "Satellites in space carry most of the messages sent between countries.",
       "trap": "opposite",
       "why": "The article says many people think this, but almost all data really moves through ocean cables."
      },
      {
       "text": "Glass threads inside cables carry messages as tiny flashes of light.",
       "trap": "detail",
       "why": "That's true, but it's one detail from the second paragraph, not what the whole article is about."
      }
     ]
    },
    {
     "id": "b4-i02-2",
     "order": 2,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author include the last paragraph?",
     "key": 0,
     "evidence": [
      10
     ],
     "options": [
      {
       "text": "To explain how a damaged cable gets fixed out at sea"
      },
      {
       "text": "To explain how messages travel another way during a repair",
       "trap": "not-in-text",
       "why": "The last paragraph never says how messages travel during a repair. It tells what the crew does."
      },
      {
       "text": "To explain how a new cable is first laid across the ocean",
       "trap": "not-in-text",
       "why": "The last paragraph is about a cable that gets damaged, not a brand-new cable being laid."
      },
      {
       "text": "To explain how cables near shore are kept safe from ships",
       "trap": "true-but",
       "why": "The article does tell this, but in the third paragraph, not the last one."
      }
     ]
    },
    {
     "id": "b4-i02-3",
     "order": 3,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "According to the article, what is one result of keeping deep-sea cables thin?",
     "key": 0,
     "evidence": [
      6
     ],
     "options": [
      {
       "text": "One ship can carry a very long stretch of cable at once."
      },
      {
       "text": "The cable settles gently on the bottom instead of sinking in mud.",
       "trap": "not-in-text",
       "why": "The article never says how the cable settles. Reread the end of the second paragraph."
      },
      {
       "text": "Repair crews can lift the cable onto the deck more easily.",
       "trap": "word-lift",
       "why": "The last paragraph uses the words lift and deck, but it never says thin cables are easier to lift."
      },
      {
       "text": "The cable costs much less money to build and lay down.",
       "trap": "not-in-text",
       "why": "The article never talks about cost. Look at the last sentence of the second paragraph."
      }
     ]
    },
    {
     "id": "b4-i02-4",
     "order": 4,
     "format": "order",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Put the steps for fixing a damaged cable in the order they happen.",
     "why": "Read the last paragraph slowly and follow the time words, like first, next and then.",
     "steps": [
      "A hook cuts the damaged cable in two.",
      "One cut end is tied to a floating buoy.",
      "Workers send test signals to land.",
      "Spare cable is added to the line."
     ]
    },
    {
     "id": "b4-i02-5",
     "order": 5,
     "format": "two-part",
     "area": "informational-craft",
     "skill": "text-structure",
     "evidence": [
      7
     ],
     "a": {
      "prompt": "Part A: How does the author organize the second and third paragraphs?",
      "key": 2,
      "options": [
       {
        "text": "By describing a cable's layers from the outside in toward the center",
        "trap": "not-in-text",
        "why": "These paragraphs don't go layer by layer. Look at where each cable lies."
       },
       {
        "text": "By comparing how cables were built long ago with how they are built today",
        "trap": "not-in-text",
        "why": "These paragraphs don't talk about the past. They tell about cables in two different places."
       },
       {
        "text": "By contrasting cables far out at sea with cables close to shore"
       },
       {
        "text": "By listing the dangers to cables from the most common to the least common",
        "trap": "word-lift",
        "why": "The third paragraph names some dangers, but the two paragraphs are not a ranked list of them."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 3,
      "options": [
       {
        "text": "“Ships drop heavy anchors there, and fishing boats drag nets along the bottom.”",
        "trap": "true-but",
        "why": "That sentence tells about dangers near shore only. It doesn't show how the two kinds of cable differ."
       },
       {
        "text": "“Inside are glass threads thinner than a hair, carrying messages as flashes of light.”",
        "trap": "true-but",
        "why": "That sentence is in the passage, but it describes one cable. It doesn't point out a difference."
       },
       {
        "text": "“So these cables are wrapped in steel and buried under the sand.”",
        "trap": "true-but",
        "why": "That tells about cables near shore only. It does not show the difference from deep water."
       },
       {
        "text": "“Close to shore, cables are built very differently.”"
       }
      ]
     }
    }
   ],
   "level": 960
  },
  {
   "id": "b4-i03",
   "type": "informational",
   "genre": "biography",
   "title": "The Teacher Who Wanted Letters to Match Sounds",
   "band": "b4",
   "topics": [
    "spanish",
    "languages",
    "people-places"
   ],
   "paragraphs": [
    [
     "If you hear a new Spanish word, you can usually guess how to spell it.",
     "That is much harder in English, where the words tough and though look almost alike but sound different.",
     "Spanish works this way partly because of a teacher who lived over five hundred years ago."
    ],
    [
     "Antonio de Nebrija was born in Spain around 1444.",
     "He studied in Italy for about ten years and then taught Latin at a university in Salamanca.",
     "Nebrija believed Spanish deserved clear written rules, just as Latin had."
    ],
    [
     "In his time, however, Spanish spelling was a jumble.",
     "Some sounds could be written with two or three different letters, and some letters stood for more than one sound.",
     "Writers simply chose the spellings they liked, so one word could look different from book to book.",
     "Nebrija believed this made reading and learning much harder than it needed to be."
    ],
    [
     "In 1492, he finished a grammar, a book of rules for the Spanish language.",
     "In it, he argued that people should write words the way they say them, with one letter for each sound.",
     "He borrowed this idea from Quintilian, a teacher in ancient Rome who had written much the same thing.",
     "When Nebrija was in his seventies, he published a short book only about spelling rules."
    ],
    [
     "Other scholars kept working on Spanish spelling for hundreds of years.",
     "Still, many of them shared the goal he had set: letters that match sounds."
    ]
   ],
   "items": [
    {
     "id": "b4-i03-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this passage mostly about?",
     "key": 0,
     "evidence": [
      11,
      15
     ],
     "options": [
      {
       "text": "Antonio de Nebrija worked to make Spanish letters match Spanish sounds."
      },
      {
       "text": "Antonio de Nebrija taught Latin to students at a Spanish university.",
       "trap": "true-but",
       "why": "That's true, but it's a small detail about his job. The passage mostly follows his spelling idea."
      },
      {
       "text": "Antonio de Nebrija wrote a book of rules for the Spanish language.",
       "trap": "detail",
       "why": "That's true, but the grammar is one detail. Most of the passage is about his idea for spelling."
      },
      {
       "text": "Antonio de Nebrija explained why English spelling is harder than Spanish.",
       "trap": "word-lift",
       "why": "English is mentioned at the start, but the passage never says Nebrija wrote about English."
      }
     ]
    },
    {
     "id": "b4-i03-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the passage, what did Nebrija do when he was in his seventies?",
     "key": 3,
     "evidence": [
      13
     ],
     "options": [
      {
       "text": "He finished a grammar of the Spanish language.",
       "trap": "word-lift",
       "why": "He did write a grammar, but the passage says he finished it in 1492, much earlier in his life."
      },
      {
       "text": "He made a dictionary of Spanish and Latin words.",
       "trap": "not-in-text",
       "why": "The passage never mentions a dictionary. Look at what it says about his seventies."
      },
      {
       "text": "He taught Latin at a university in Salamanca.",
       "trap": "true-but",
       "why": "He did teach Latin, but the passage tells about that in his earlier years, not his seventies."
      },
      {
       "text": "He published a short book only about spelling rules."
      }
     ]
    },
    {
     "id": "b4-i03-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author mention Quintilian?",
     "key": 3,
     "evidence": [
      12
     ],
     "options": [
      {
       "text": "to show that the idea came from his teachers in Italy",
       "trap": "not-in-text",
       "why": "The passage says Quintilian lived in ancient Rome, long before Nebrija studied in Italy."
      },
      {
       "text": "to show that Latin once had the same spelling problem",
       "trap": "not-in-text",
       "why": "The passage never says Latin spelling was a jumble. It says Quintilian wrote an idea like Nebrija's."
      },
      {
       "text": "to show that Nebrija's grammar copied an older grammar",
       "trap": "word-lift",
       "why": "Nebrija borrowed one idea, not a whole book. The passage never says his grammar was copied."
      },
      {
       "text": "to show that the idea came from a much older writer"
      }
     ]
    },
    {
     "id": "b4-i03-4",
     "order": 4,
     "format": "sentence",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "Tap the sentence that tells why Nebrija thought Spanish spelling needed fixing.",
     "keys": [
      9
     ],
     "why": "Look in the paragraph about Spanish spelling in his time for what Nebrija believed the jumble did."
    },
    {
     "id": "b4-i03-5",
     "order": 5,
     "format": "multi",
     "area": "informational-craft",
     "skill": "text-structure",
     "prompt": "Pick two ways the author organizes this passage.",
     "keys": [
      1,
      2
     ],
     "evidence": [
      0,
      2,
      3,
      10,
      13
     ],
     "options": [
      {
       "text": "It compares Nebrija's life with Quintilian's life, step by step.",
       "trap": "word-lift",
       "why": "Quintilian is named only once, for the idea Nebrija borrowed. The passage does not tell his life."
      },
      {
       "text": "It starts with something true today, then goes back in time."
      },
      {
       "text": "It uses years and ages to move through Nebrija's life in order."
      },
      {
       "text": "It begins with Nebrija's birth and ends with his death.",
       "trap": "not-in-text",
       "why": "The passage begins with spelling today, not his birth, and it never tells about his death."
      },
      {
       "text": "It lists the steps Nebrija followed to write his grammar.",
       "trap": "not-in-text",
       "why": "The passage tells what his grammar argued, but it never gives steps for writing one."
      }
     ]
    }
   ],
   "level": 920
  },
  {
   "id": "b4-i04",
   "type": "informational",
   "genre": "how-it-works",
   "title": "Rooms Under the Sea: How a Lobster Trap Works",
   "band": "b4",
   "topics": [
    "fishing",
    "sports"
   ],
   "paragraphs": [
    [
     "Off the coast of Maine, bright buoys bob on the waves like floating candy.",
     "Each buoy is tied to a rope that leads down to a trap on the sea floor.",
     "A fisher grabs the rope at each buoy to haul the trap up to the boat.",
     "The trap looks like a plain wire box, but inside it is divided into rooms."
    ],
    [
     "The first room is called the kitchen.",
     "A mesh bag of fish scraps hangs there as bait.",
     "A hungry lobster follows the smell and crawls through a net tunnel on the side of the trap.",
     "The tunnel is wide on the outside and narrow on the inside, like a funnel.",
     "Once inside the kitchen, the lobster tears into the bait."
    ],
    [
     "When it tries to leave, it often crawls into a second tunnel instead.",
     "This tunnel leads to the parlor, the room at the far end of the trap.",
     "Its inner opening is small and high off the floor, so finding the way back is hard.",
     "Some lobsters still escape, but many stay until the fisher pulls up the trap."
    ],
    [
     "A good trap also lets certain animals go.",
     "Each parlor has a small rectangular gap called an escape vent.",
     "Young lobsters are thin enough to squeeze through it and crawl away to grow.",
     "On a lost trap, clips holding one panel shut slowly rust until it falls open.",
     "That way, a lost trap cannot go on catching animals on the sea floor for years."
    ]
   ],
   "items": [
    {
     "id": "b4-i04-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is the passage mostly about?",
     "key": 1,
     "evidence": [
      3,
      13
     ],
     "options": [
      {
       "text": "How fishers use buoys and ropes to find and pull up their traps",
       "trap": "detail",
       "why": "The buoys are in the first paragraph, but that's one detail. Most of the passage explains the inside of the trap."
      },
      {
       "text": "How the inside of a lobster trap catches lobsters and frees some"
      },
      {
       "text": "How fishers choose the best spots on the sea floor to set traps",
       "trap": "not-in-text",
       "why": "The passage never tells how fishers pick spots. It follows a lobster through the rooms of a trap."
      },
      {
       "text": "How lobster traps have changed from wooden boxes to wire ones",
       "trap": "not-in-text",
       "why": "The passage never tells the history of traps. It explains how one wire trap works today."
      }
     ]
    },
    {
     "id": "b4-i04-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the passage, what makes it hard for a lobster to leave the parlor?",
     "key": 2,
     "evidence": [
      11
     ],
     "options": [
      {
       "text": "Its way out has stiff net strands that poke in toward it.",
       "trap": "not-in-text",
       "why": "The passage never says the net pokes the lobster. Look at how the opening is described."
      },
      {
       "text": "Its way out is covered by a flap that swings only one way.",
       "trap": "not-in-text",
       "why": "The passage never mentions a flap. Reread what it says about the parlor's opening."
      },
      {
       "text": "Its way out is a small opening set high above the floor."
      },
      {
       "text": "Its way out is blocked by the hanging bag of fish scraps.",
       "trap": "word-lift",
       "why": "The bait bag hangs in the kitchen, and the passage never says it blocks anything."
      }
     ]
    },
    {
     "id": "b4-i04-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author include the last paragraph?",
     "key": 1,
     "evidence": [
      13
     ],
     "options": [
      {
       "text": "To explain why there are rules about how many traps one fisher may set",
       "trap": "not-in-text",
       "why": "The passage never mentions rules about traps. The last paragraph tells about a vent and a panel."
      },
      {
       "text": "To explain how the trap is built to let some animals go free"
      },
      {
       "text": "To explain how fishers decide which lobsters are big enough to keep",
       "trap": "not-in-text",
       "why": "The last paragraph never shows a fisher checking lobsters. Young ones leave by themselves through a gap."
      },
      {
       "text": "To explain how a fisher pulls up a trap and empties the parlor",
       "trap": "word-lift",
       "why": "The passage mentions pulling up the trap, but the last paragraph is about parts that let animals out."
      }
     ]
    },
    {
     "id": "b4-i04-4",
     "order": 4,
     "format": "two-part",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "evidence": [
      16
     ],
     "a": {
      "prompt": "Part A: According to the passage, what causes a lost trap to stop catching animals?",
      "key": 0,
      "options": [
       {
        "text": "Clips holding a panel shut rust away, so the panel falls open."
       },
       {
        "text": "The wooden slats on one side rot away, so a wide gap opens.",
        "trap": "not-in-text",
        "why": "This trap is a wire box, and the passage never talks about wooden slats."
       },
       {
        "text": "The bait bag rots and falls away, so no lobsters come inside.",
        "trap": "not-in-text",
        "why": "The passage never says the bait bag falls away. Look at what happens to the panel."
       },
       {
        "text": "A cotton string holding a door shut rots, so the door swings open.",
        "trap": "not-in-text",
        "why": "Some traps might work that way, but this passage never mentions string or a door."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 1,
      "options": [
       {
        "text": "“Young lobsters are thin enough to squeeze through it and crawl away to grow.”",
        "trap": "true-but",
        "why": "This sentence tells how young lobsters leave, not how a lost trap stops catching."
       },
       {
        "text": "“On a lost trap, clips holding one panel shut slowly rust until it falls open.”"
       },
       {
        "text": "“That way, a lost trap cannot go on catching animals on the sea floor for years.”",
        "trap": "true-but",
        "why": "This tells what happens, but not what causes it. Look for the sentence about the panel."
       },
       {
        "text": "“Some lobsters still escape, but many stay until the fisher pulls up the trap.”",
        "trap": "true-but",
        "why": "This sentence is about lobsters in the parlor, not about a trap that is lost."
       }
      ]
     }
    },
    {
     "id": "b4-i04-5",
     "order": 5,
     "format": "order",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Put the lobster's trip through the trap in order.",
     "why": "Follow the lobster through the second and third paragraphs. Look for words like \"first room\" and \"when it tries to leave.\"",
     "steps": [
      "The lobster follows the smell of fish scraps to the trap.",
      "The lobster crawls through a side tunnel into the kitchen.",
      "The lobster takes a second tunnel while trying to leave.",
      "The lobster reaches the parlor at the far end."
     ]
    }
   ],
   "level": 880
  },
  {
   "id": "b4-i07",
   "type": "informational",
   "genre": "article",
   "title": "Tunnels Left Behind by Lava",
   "band": "b4",
   "topics": [
    "caves",
    "geology",
    "nature-earth"
   ],
   "paragraphs": [
    [
     "Most caves take a very long time to form.",
     "Over many thousands of years, water slowly eats away at rock such as limestone, leaving open spaces underground.",
     "A lava tube is different.",
     "This kind of cave is made by melted rock, and it can form during one eruption."
    ],
    [
     "The story of a lava tube begins when a volcano sends out a river of glowing lava.",
     "The top of the river touches the cool air, so it cools first and hardens into a solid crust.",
     "Under this crust, the lava stays hot and keeps flowing, almost like water rushing through a pipe.",
     "The crust works like a blanket, holding in the heat so the lava can travel far.",
     "When the eruption finally stops, no new lava pours in, but the lava already inside keeps sliding downhill until it is gone.",
     "What remains is a long, empty tunnel."
    ],
    [
     "Visitors who walk through a lava tube can still find clues to how it was made.",
     "Lines along the walls show where the lava's surface once stood, a bit like rings left in a bathtub.",
     "Drips of lava sometimes hardened on the ceiling into small, pointed shapes."
    ],
    [
     "Lava tubes are found in volcanic places such as Hawaii and Iceland.",
     "Scientists have even spotted openings on the Moon that may lead into giant lava tubes.",
     "Someday, these hidden tunnels might shelter astronauts from the harsh conditions on the surface."
    ]
   ],
   "items": [
    {
     "id": "b4-i07-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this article mostly about?",
     "key": 2,
     "evidence": [
      3,
      9
     ],
     "options": [
      {
       "text": "how ocean waves can slowly hollow out caves in cliffs",
       "trap": "not-in-text",
       "why": "The article does not mention waves or cliffs. Reread the second paragraph to see what makes the cave."
      },
      {
       "text": "how water can slowly eat away limestone to form caves",
       "trap": "detail",
       "why": "The first paragraph mentions this, but only to compare. The rest of the article is about a different kind of cave."
      },
      {
       "text": "how flowing lava can leave a tunnel behind after an eruption"
      },
      {
       "text": "how melting ice inside a glacier can carve out a tunnel",
       "trap": "not-in-text",
       "why": "The article never talks about ice or glaciers. Look at what makes the tunnels it describes."
      }
     ]
    },
    {
     "id": "b4-i07-2",
     "order": 2,
     "format": "single",
     "area": "informational-craft",
     "skill": "text-structure",
     "prompt": "How does the author organize the first paragraph?",
     "key": 2,
     "evidence": [
      0,
      2
     ],
     "options": [
      {
       "text": "by asking a question and then giving the answer to it",
       "trap": "not-in-text",
       "why": "The first paragraph has no question in it. Look at the words \"A lava tube is different.\""
      },
      {
       "text": "by telling the steps of a process in the order they happen",
       "trap": "true-but",
       "why": "Steps in order come in the second paragraph. Reread the first paragraph's first and third sentences."
      },
      {
       "text": "by showing how one kind of cave is different from most others"
      },
      {
       "text": "by describing what visitors see when they walk inside a cave",
       "trap": "true-but",
       "why": "Visitors are described in the third paragraph, not the first one."
      }
     ]
    },
    {
     "id": "b4-i07-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "evidence",
     "prompt": "Which sentence best explains why a lava tube ends up hollow instead of full of hard rock?",
     "key": 3,
     "evidence": [
      8
     ],
     "options": [
      {
       "text": "“The crust works like a blanket, holding in the heat so the lava can travel far.”",
       "trap": "true-but",
       "why": "This explains how the lava stays hot, but not what happens to it when the eruption ends."
      },
      {
       "text": "“What remains is a long, empty tunnel.”",
       "trap": "word-lift",
       "why": "This says the tunnel is empty, but it does not explain how it got that way."
      },
      {
       "text": "“Under this crust, the lava stays hot and keeps flowing, almost like water rushing through a pipe.”",
       "trap": "true-but",
       "why": "This tells how lava moves while the volcano is still erupting, not why the tunnel ends up empty."
      },
      {
       "text": "“When the eruption finally stops, no new lava pours in, but the lava already inside keeps sliding downhill until it is gone.”"
      }
     ]
    },
    {
     "id": "b4-i07-4",
     "order": 4,
     "format": "multi",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the article, which clues inside a lava tube show how it was made? Pick two.",
     "keys": [
      3,
      4
     ],
     "evidence": [
      11,
      12
     ],
     "options": [
      {
       "text": "ropy folds where lava cooled and hardened on the floor",
       "trap": "not-in-text",
       "why": "The article never mentions the floor. Look at what it says about the walls and ceiling."
      },
      {
       "text": "a shiny coating where hot gases melted the rock walls",
       "trap": "not-in-text",
       "why": "The article does not talk about gases or a shiny coating. Reread the third paragraph."
      },
      {
       "text": "stone columns where drips reached all the way to the floor",
       "trap": "word-lift",
       "why": "The article mentions drips, but it says they hardened on the ceiling, not into columns."
      },
      {
       "text": "lines on the walls that show where the lava's surface was"
      },
      {
       "text": "small, pointed shapes left by lava drips on the ceiling"
      }
     ]
    },
    {
     "id": "b4-i07-5",
     "order": 5,
     "format": "sentence",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Tap the sentence the author uses to help readers picture how lava moves under its hard top.",
     "keys": [
      6
     ],
     "why": "Look in the second paragraph for a comparison to something familiar that moves."
    }
   ],
   "level": 1000
  },
  {
   "id": "b4-i09",
   "type": "informational",
   "genre": "article",
   "title": "The Fire Truck with Two Drivers",
   "band": "b4",
   "topics": [
    "fire-trucks",
    "trucks",
    "vehicles-engineering"
   ],
   "paragraphs": [
    [
     "Most fire trucks have one driver, but a few need two people to steer them.",
     "These tiller trucks carry a ladder long enough to reach the top of a tall building.",
     "Because the ladder is so long, the truck can stretch more than fifty feet.",
     "That length creates a real problem on crowded city streets."
    ],
    [
     "Picture a long bus turning a sharp corner.",
     "The back wheels drift inward and can bump the curb, a sign, or a parked car.",
     "A truck as long as a tiller truck would have the same trouble, only worse."
    ],
    [
     "To solve this, the truck has a second steering wheel at the very back.",
     "A firefighter called the tiller driver sits there in a small cab and steers the rear wheels.",
     "When the front turns left, the tiller driver can swing the back end the other way.",
     "Together, the two drivers bend the long truck around corners that a regular ladder truck could not make."
    ],
    [
     "The drivers sit far apart, so they talk through headsets or signal with a buzzer.",
     "Each one must know what the other is about to do before the truck moves."
    ],
    [
     "The idea of a back-seat driver is older than motor fire engines.",
     "Long ago, horses pulled ladder wagons, and a firefighter at the rear steered them.",
     "Today, many big cities still use tiller trucks to reach fires on narrow streets."
    ]
   ],
   "items": [
    {
     "id": "b4-i09-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this article mostly about?",
     "key": 3,
     "evidence": [
      7,
      10
     ],
     "options": [
      {
       "text": "Firefighters who drive trucks use headsets so they can stay safe.",
       "trap": "too-narrow",
       "why": "Headsets come up in one sentence only. The article is mostly about how the long truck gets steered."
      },
      {
       "text": "Some fire trucks carry ladders that reach the tops of tall buildings.",
       "trap": "detail",
       "why": "That's true, but it's one detail from the start. The question asks about the whole article."
      },
      {
       "text": "Long ago, ladder wagons were pulled by horses and steered from behind.",
       "trap": "detail",
       "why": "That's in the last paragraph, but it's only one detail. Most of the article is about something else."
      },
      {
       "text": "A second driver at the back helps a very long truck turn tight corners."
      }
     ]
    },
    {
     "id": "b4-i09-2",
     "order": 2,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author tell about the ladder wagons pulled by horses?",
     "key": 3,
     "evidence": [
      13,
      14
     ],
     "options": [
      {
       "text": "To explain why the old ladders were made of wood, not metal",
       "trap": "not-in-text",
       "why": "The article doesn't say what the ladders were made of. Look at who sat at the back of the wagons."
      },
      {
       "text": "To show how much faster fire trucks became once horses were gone",
       "trap": "not-in-text",
       "why": "The article never talks about speed. Reread the first sentence of the last paragraph."
      },
      {
       "text": "To show how firefighters trained horses to stay calm near smoke",
       "trap": "not-in-text",
       "why": "The article doesn't mention training horses. Think about what the firefighter at the rear was doing."
      },
      {
       "text": "To show that steering from the rear began long before motor trucks"
      }
     ]
    },
    {
     "id": "b4-i09-3",
     "order": 3,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "According to the article, what happens when the front of the truck turns left?",
     "key": 1,
     "evidence": [
      9
     ],
     "options": [
      {
       "text": "The tiller driver turns the back wheels to the left as well.",
       "trap": "opposite",
       "why": "That's the opposite of what the third paragraph says about the back end."
      },
      {
       "text": "The tiller driver can swing the back end the other way."
      },
      {
       "text": "The tiller driver holds the back wheels perfectly straight.",
       "trap": "not-in-text",
       "why": "The article never says the back wheels stay straight. Reread the third paragraph."
      },
      {
       "text": "The tiller driver sounds a buzzer to warn nearby cars.",
       "trap": "word-lift",
       "why": "A buzzer is in the article, but it's for the two drivers to signal each other. Reread the third paragraph."
      }
     ]
    },
    {
     "id": "b4-i09-4",
     "order": 4,
     "format": "sentence",
     "area": "informational-craft",
     "skill": "text-structure",
     "prompt": "This article tells about a problem and then a way to solve it. Tap the sentence that first names the problem.",
     "keys": [
      3
     ],
     "why": "Look in the first paragraph for the sentence that tells something is going wrong, before the article explains the fix."
    },
    {
     "id": "b4-i09-5",
     "order": 5,
     "format": "multi",
     "area": "informational-craft",
     "skill": "evidence",
     "prompt": "Which two details from the article show that the two drivers must work closely together? Pick two.",
     "keys": [
      2,
      3
     ],
     "evidence": [
      11,
      12
     ],
     "options": [
      {
       "text": "The two drivers sit side by side so they can see each other.",
       "trap": "opposite",
       "why": "That's the opposite. The article says the drivers sit far apart."
      },
      {
       "text": "The front driver calls out every turn over a loudspeaker.",
       "trap": "not-in-text",
       "why": "The article doesn't mention a loudspeaker. Check how the drivers really reach each other."
      },
      {
       "text": "Each driver must know what the other will do before moving."
      },
      {
       "text": "The two drivers talk through headsets or signal with a buzzer."
      },
      {
       "text": "The two drivers practice turns together in an empty lot.",
       "trap": "not-in-text",
       "why": "The article never mentions practice. Look for details the fourth paragraph really gives."
      }
     ]
    }
   ],
   "level": 910
  },
  {
   "id": "b4-i10",
   "type": "informational",
   "genre": "biography",
   "title": "The Woman Who Made Shadows Move",
   "band": "b4",
   "topics": [
    "filmmaking",
    "movies",
    "arts-entertainment"
   ],
   "paragraphs": [
    [
     "In 1926, audiences in Berlin, Germany, watched a movie unlike any they had seen.",
     "Every character was a black shadow moving against a glowing, colorful background.",
     "The film was called The Adventures of Prince Achmed, and it told an old tale about a magic flying horse.",
     "It is the oldest full-length animated movie that still survives today.",
     "Its maker was a woman named Lotte Reiniger."
    ],
    [
     "Reiniger was born in Berlin in 1899.",
     "As a young girl, she loved cutting shapes from paper with small scissors.",
     "She used her cutouts to put on shadow puppet shows for her family.",
     "As a teenager, she joined a theater group and cut paper portraits of the actors.",
     "A filmmaker in the group saw her work and asked her to make silhouettes for one of his movies."
    ],
    [
     "In 1923, Reiniger began work on Prince Achmed with a small team of helpers.",
     "She cut each figure from black cardboard and joined its arms and legs with thin wire.",
     "She laid the figures on a glass table lit from below, with a camera pointing down from above.",
     "Light shining up through the glass turned each cardboard figure into a sharp black shape.",
     "After each photo, she moved a figure just a tiny bit.",
     "When the photos were shown quickly, the shadows seemed to dance.",
     "A single second of film needed many photos, so the work took three years.",
     "Reiniger kept making shadow films for the rest of her long life."
    ]
   ],
   "items": [
    {
     "id": "b4-i10-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this passage mostly about?",
     "key": 2,
     "evidence": [
      6,
      11,
      17
     ],
     "options": [
      {
       "text": "How a girl's love of acting became a life of starring in silent films",
       "trap": "word-lift",
       "why": "She joined a theater group, but she cut portraits of the actors. The passage never says she acted."
      },
      {
       "text": "How a girl's love of taking photos became a life of making nature films",
       "trap": "word-lift",
       "why": "Photos are part of how her movie was made, but the passage never says she loved photography as a girl."
      },
      {
       "text": "How a girl's love of cutting paper became a life of making animated films"
      },
      {
       "text": "How a girl's love of drawing became a life of making cartoon films",
       "trap": "not-in-text",
       "why": "The passage never says she drew pictures. Look at what she did with her small scissors."
      }
     ]
    },
    {
     "id": "b4-i10-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "What did Reiniger cut the figures for Prince Achmed from?",
     "key": 2,
     "evidence": [
      11
     ],
     "options": [
      {
       "text": "She cut them from thin black paper.",
       "trap": "word-lift",
       "why": "She cut paper as a girl, but the movie figures were made of something else. Check the third paragraph."
      },
      {
       "text": "She cut them from painted leather.",
       "trap": "not-in-text",
       "why": "Some shadow puppets are made of leather, but this passage never says that. Check the third paragraph."
      },
      {
       "text": "She cut them from black cardboard."
      },
      {
       "text": "She cut them from thin sheets of metal.",
       "trap": "word-lift",
       "why": "The passage mentions thin wire for the arms and legs, but not sheets of metal."
      }
     ]
    },
    {
     "id": "b4-i10-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author describe the glass table in the third paragraph?",
     "key": 2,
     "evidence": [
      12,
      13
     ],
     "options": [
      {
       "text": "To explain how the camera took many photos very quickly",
       "trap": "opposite",
       "why": "The photos were taken one at a time, with a tiny move after each one. That was slow work."
      },
      {
       "text": "To explain how the team added bright colors to each scene",
       "trap": "not-in-text",
       "why": "The background was colorful, but the part about the table never explains how colors were added."
      },
      {
       "text": "To explain how the cardboard figures came to look like black shadows"
      },
      {
       "text": "To explain how the figures were kept still between photos",
       "trap": "not-in-text",
       "why": "The table part tells about light and the camera. It never says how the figures were held still."
      }
     ]
    },
    {
     "id": "b4-i10-4",
     "order": 4,
     "format": "two-part",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "evidence": [
      16
     ],
     "a": {
      "prompt": "Part A: Why did it take three years to make Prince Achmed?",
      "key": 0,
      "options": [
       {
        "text": "Each second of the movie needed many photos."
       },
       {
        "text": "The team first had to build a special camera.",
        "trap": "not-in-text",
        "why": "The passage mentions a camera above the table, but never says the team built one."
       },
       {
        "text": "Reiniger cut a new figure for every pose.",
        "trap": "opposite",
        "why": "She used the same figures and moved them a little. Their wire joints let them change poses."
       },
       {
        "text": "Each scene was filmed several times over.",
        "trap": "not-in-text",
        "why": "The passage never says scenes were filmed again. Think about how many photos the film needed."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“In 1923, Reiniger began work on Prince Achmed with a small team of helpers.”",
        "trap": "true-but",
        "why": "This tells when the work began, but not why it took so long."
       },
       {
        "text": "“She cut each figure from black cardboard and joined its arms and legs with thin wire.”",
        "trap": "true-but",
        "why": "This tells how the figures were made, but not why the movie took three years."
       },
       {
        "text": "“A single second of film needed many photos, so the work took three years.”"
       },
       {
        "text": "“Every character was a black shadow moving against a glowing, colorful background.”",
        "trap": "true-but",
        "why": "This describes how the movie looked, not why making it took so long."
       }
      ]
     }
    },
    {
     "id": "b4-i10-5",
     "order": 5,
     "format": "order",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Put these events from Lotte Reiniger's life in order, from first to last.",
     "why": "The passage starts in 1926 and then goes back in time. Use her age and the years to find the order.",
     "steps": [
      "She put on shadow puppet shows for her family.",
      "She cut paper portraits of actors in a theater group.",
      "She made silhouettes for another filmmaker's movie.",
      "Audiences in Berlin watched Prince Achmed."
     ]
    }
   ],
   "level": 910
  },
  {
   "id": "b4-i12",
   "type": "informational",
   "genre": "history",
   "title": "The Crank That Changed Ice Cream",
   "band": "b4",
   "topics": [
    "ice-cream",
    "food-science",
    "food"
   ],
   "paragraphs": [
    [
     "By the late 1800s, many American families made their own ice cream on hot summer afternoons.",
     "Children took turns turning a handle on a wooden bucket until their arms grew tired.",
     "The machine they were using had been invented decades earlier by a woman named Nancy Johnson."
    ],
    [
     "Before her invention, making ice cream at home was slow and difficult work.",
     "A cook set a metal pot of sweet cream inside a bowl of ice and salt.",
     "The salt made the ice melt into a slushy mix that was even colder than plain ice.",
     "Then the cook shook the pot and scraped its sides by hand for a long time.",
     "If the cook did not stir enough, the cream froze into hard, icy chunks."
    ],
    [
     "In 1843, Nancy Johnson of Philadelphia received a patent for a better design.",
     "Her freezer held a metal can that sat inside a wooden tub packed with ice and salt.",
     "Inside the can was a paddle, which was connected to a crank on the top.",
     "When someone turned the crank, the paddle stirred the cream and scraped frozen bits off the walls.",
     "Because the cream never stopped moving, it froze into tiny crystals and came out smooth."
    ],
    [
     "Johnson's idea caught on, and other inventors soon built and sold their own versions.",
     "Ice cream was no longer a treat served mostly in the homes of wealthy families.",
     "With a hand-cranked freezer and some ice, almost anyone could make it."
    ]
   ],
   "items": [
    {
     "id": "b4-i12-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this passage mostly about?",
     "key": 2,
     "evidence": [
      2,
      15
     ],
     "options": [
      {
       "text": "why adding salt to ice makes the ice even colder",
       "trap": "detail",
       "why": "The passage does say this, but it is one small detail. The question asks about the whole passage."
      },
      {
       "text": "how cooks made ice cream by shaking pots of cream",
       "trap": "too-narrow",
       "why": "That is only the second paragraph. Most of the passage is about Nancy Johnson's freezer."
      },
      {
       "text": "how one woman's machine made ice cream easier to make at home"
      },
      {
       "text": "how ice cream first came to America from Europe",
       "trap": "not-in-text",
       "why": "The passage never talks about Europe. Check what most of the paragraphs describe."
      }
     ]
    },
    {
     "id": "b4-i12-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the passage, what was inside the metal can of Johnson's freezer?",
     "key": 2,
     "evidence": [
      10
     ],
     "options": [
      {
       "text": "a layer of ice and salt",
       "trap": "opposite",
       "why": "The ice and salt were packed around the can, in the tub outside it. Reread the third paragraph."
      },
      {
       "text": "a block of ice from a pond",
       "trap": "not-in-text",
       "why": "The passage never mentions ice from a pond. Look at the sentence that begins \"Inside the can.\""
      },
      {
       "text": "a paddle connected to a crank"
      },
      {
       "text": "a wooden tub full of cream",
       "trap": "word-lift",
       "why": "The passage mentions a wooden tub, but the can sat inside the tub, not the other way around."
      }
     ]
    },
    {
     "id": "b4-i12-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author include the second paragraph?",
     "key": 0,
     "evidence": [
      3,
      6
     ],
     "options": [
      {
       "text": "to show how hard making ice cream was before the crank freezer"
      },
      {
       "text": "to describe how a mix of salt and ice gets so cold",
       "trap": "too-narrow",
       "why": "That is just one sentence in the paragraph. The whole paragraph shows the slow, difficult work."
      },
      {
       "text": "to explain why ice cream was mostly a treat for wealthy families",
       "trap": "not-in-text",
       "why": "Wealthy families come up in the last paragraph, not the second. The second paragraph describes the old way of making it."
      },
      {
       "text": "to show that cooks made smoother ice cream than machines did",
       "trap": "opposite",
       "why": "The paragraph says the old way could leave hard, icy chunks. The freezer made it smooth."
      }
     ]
    },
    {
     "id": "b4-i12-4",
     "order": 4,
     "format": "sentence",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "Tap the sentence that tells why ice cream from Johnson's freezer came out smooth.",
     "keys": [
      12
     ],
     "why": "Look in the paragraph that explains how the freezer worked, near its end."
    },
    {
     "id": "b4-i12-5",
     "order": 5,
     "format": "order",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Put these events in the order they happened in history.",
     "why": "The passage starts in the late 1800s and then goes back in time. Use the date and words like \"before,\" \"earlier\" and \"soon.\"",
     "steps": [
      "Cooks shook pots of cream in bowls of ice and salt.",
      "Nancy Johnson received a patent for her freezer.",
      "Other inventors built and sold their own freezers.",
      "Many families cranked ice cream on summer afternoons."
     ]
    }
   ],
   "level": 990
  },
  {
   "id": "b4-i17",
   "type": "informational",
   "genre": "article",
   "title": "Why Pickleball Has a Kitchen",
   "band": "b4",
   "topics": [
    "pickleball",
    "tennis",
    "sports"
   ],
   "paragraphs": [
    [
     "Every pickleball court has two areas with a funny nickname: the kitchen.",
     "Their official name is the non-volley zone.",
     "Each kitchen stretches seven feet back from the net, one on each side."
    ],
    [
     "The kitchen exists to solve a problem.",
     "Without it, players would crowd the net and leave the back of the court empty.",
     "Whenever the ball floated over, a player could smash it down hard before it bounced.",
     "Points would be over after a shot or two.",
     "So the rule says you may not volley, or hit the ball in the air, while in the kitchen.",
     "You may stand there at other times, and you may hit a ball there after it bounces.",
     "Basketball has a rule for the area under the basket too, but it limits how long attackers may stay there.",
     "The kitchen rule has no time limit; it only limits one kind of hit."
    ],
    [
     "This single rule changed the way the whole game is played.",
     "Because smashing from the net was off limits, players began using a soft shot called a dink.",
     "A dink drops gently over the net and lands in the other player's kitchen.",
     "The ball bounces low and is hard to slam back.",
     "Players sometimes trade a dozen dinks or more, each trying to pull the other off balance.",
     "As a result, rallies last longer, and careful aim matters as much as power."
    ],
    [
     "This narrow strip turns pickleball into a game of patience as well as speed."
    ]
   ],
   "items": [
    {
     "id": "b4-i17-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is the article mostly about?",
     "key": 1,
     "evidence": [
      3,
      11
     ],
     "options": [
      {
       "text": "How a rule about letting the serve bounce changes the way points are played",
       "trap": "not-in-text",
       "why": "The article never talks about serves. It is about the rule for the kitchen near the net."
      },
      {
       "text": "How a rule about one area of the court changes the way points are played"
      },
      {
       "text": "How a rule about where players stand to serve changes the way points are played",
       "trap": "not-in-text",
       "why": "The article does not discuss serving. Its rule is about hitting the ball in the air in the kitchen."
      },
      {
       "text": "How a soft shot called the dink helps players win points near the net",
       "trap": "too-narrow",
       "why": "Dinks are only part of paragraph 3. The whole article is about the kitchen rule and what it changes."
      }
     ]
    },
    {
     "id": "b4-i17-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the article, what are players trying to do when they trade many dinks?",
     "key": 0,
     "evidence": [
      15
     ],
     "options": [
      {
       "text": "Pull the other player off balance"
      },
      {
       "text": "Tire out the other player's arm",
       "trap": "not-in-text",
       "why": "The article does not mention getting tired. Look again at paragraph 3 for what each player is trying to do."
      },
      {
       "text": "Make the other player step into the kitchen",
       "trap": "word-lift",
       "why": "The article uses the word kitchen, but it says players may stand there. That is not the goal of dinking."
      },
      {
       "text": "Find an opening for a hard smash",
       "trap": "not-in-text",
       "why": "The article never says players wait for a chance to smash. Reread the sentence about trading a dozen dinks."
      }
     ]
    },
    {
     "id": "b4-i17-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author mention a rule from basketball?",
     "key": 0,
     "evidence": [
      9,
      10
     ],
     "options": [
      {
       "text": "To show how the kitchen rule is different from a rule in another sport"
      },
      {
       "text": "To show that both rules were made to keep players from getting hurt",
       "trap": "not-in-text",
       "why": "The article never talks about safety. Paragraph 2 tells what problem the kitchen really fixes."
      },
      {
       "text": "To show that the kitchen rule was first borrowed from basketball",
       "trap": "not-in-text",
       "why": "The article never says pickleball took its rule from basketball. Reread the last two sentences of paragraph 2."
      },
      {
       "text": "To show that both rules limit how long players stay in one area",
       "trap": "opposite",
       "why": "The article says the kitchen rule has no time limit. Only the basketball rule is about time."
      }
     ]
    },
    {
     "id": "b4-i17-4",
     "order": 4,
     "format": "multi",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "According to the article, what would happen if pickleball had no kitchen? Pick two.",
     "keys": [
      0,
      2
     ],
     "evidence": [
      4,
      6
     ],
     "options": [
      {
       "text": "Players would crowd the net and leave the back empty."
      },
      {
       "text": "Rallies would last longer than they do now.",
       "trap": "opposite",
       "why": "The article says the kitchen makes rallies longer. Without it, points would end fast."
      },
      {
       "text": "Points would be over after just a shot or two."
      },
      {
       "text": "Players near the net could be hit by hard shots.",
       "trap": "not-in-text",
       "why": "The article never says anyone could get hit. Reread paragraph 2 for what would really happen."
      },
      {
       "text": "Tall players would have an unfair edge at the net.",
       "trap": "not-in-text",
       "why": "The article does not talk about how tall players are. Look at paragraph 2 again."
      }
     ]
    },
    {
     "id": "b4-i17-5",
     "order": 5,
     "format": "two-part",
     "area": "informational-craft",
     "skill": "text-structure",
     "evidence": [
      12
     ],
     "a": {
      "prompt": "Part A: How does the author organize paragraph 3?",
      "key": 2,
      "options": [
       {
        "text": "It tells how the rules of the game changed over many years.",
        "trap": "not-in-text",
        "why": "Paragraph 3 gives no years or history. It tells what happened because of one rule."
       },
       {
        "text": "It gives the steps a player follows to hit a good soft shot.",
        "trap": "not-in-text",
        "why": "Paragraph 3 does not teach how to hit a dink. It tells how the game changed."
       },
       {
        "text": "It explains how one rule caused a series of changes in the game."
       },
       {
        "text": "It compares a soft shot with a hard shot to show which is better.",
        "trap": "not-in-text",
        "why": "Paragraph 3 describes the dink, but it does not set two shots side by side to judge them."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“A dink drops gently over the net and lands in the other player's kitchen.”",
        "trap": "true-but",
        "why": "That sentence tells what a dink does. It does not show one thing leading to another."
       },
       {
        "text": "“Players sometimes trade a dozen dinks or more, each trying to pull the other off balance.”",
        "trap": "true-but",
        "why": "That sentence describes how players dink. It does not show what caused the change."
       },
       {
        "text": "“Because smashing from the net was off limits, players began using a soft shot called a dink.”"
       },
       {
        "text": "“So the rule says you may not volley, or hit the ball in the air, while in the kitchen.”",
        "trap": "true-but",
        "why": "That sentence states the rule in paragraph 2. It does not show the changes the rule led to."
       }
      ]
     }
    }
   ],
   "level": 860
  },
  {
   "id": "b4-i18",
   "type": "informational",
   "genre": "biography",
   "title": "Meriwether Lewis Goes Back to School",
   "band": "b4",
   "topics": [
    "lewis-and-clark",
    "explorers",
    "history"
   ],
   "paragraphs": [
    [
     "In 1803, President Thomas Jefferson chose Meriwether Lewis to lead a journey across the American West.",
     "Lewis was a skilled army captain who knew how to survive in the wilderness.",
     "However, the trip would also require science, such as mapmaking and medicine, so before the journey began, Lewis became a student again."
    ],
    [
     "First, he traveled to an army workshop at Harpers Ferry, Virginia.",
     "There he collected rifles and had workers build an iron frame for a folding boat.",
     "Next, in Lancaster, Pennsylvania, an expert taught him to measure his location by studying the stars.",
     "Those measurements would help him draw accurate maps."
    ],
    [
     "Finally, Lewis spent several weeks in Philadelphia, a center of science.",
     "A well-known doctor taught him how to treat illnesses and injuries.",
     "A plant expert showed him how to press flowers flat between sheets of paper to save them.",
     "Only after these lessons did Lewis write to his friend William Clark and invite him to share command."
    ],
    [
     "Not every plan worked.",
     "Two years later, in what is now Montana, the crew assembled the iron boat and covered it with animal skins.",
     "They needed pine pitch to seal the seams, but no pine trees grew nearby.",
     "They tried a mix of charcoal, beeswax and buffalo fat instead, but the boat leaked badly, and Lewis left it behind.",
     "Still, his lessons in medicine, plants and stars helped the explorers bring home maps and notes about the West."
    ]
   ],
   "items": [
    {
     "id": "b4-i18-1",
     "order": 1,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "main-idea",
     "prompt": "What is this passage mostly about?",
     "key": 1,
     "evidence": [
      2,
      5,
      8,
      9
     ],
     "options": [
      {
       "text": "Lewis got ready for the trip by choosing strong soldiers and hunters for his crew.",
       "trap": "not-in-text",
       "why": "The passage never tells how the crew was chosen. Look at what Lewis did in each city."
      },
      {
       "text": "Lewis got ready for the trip by studying science with teachers in different cities."
      },
      {
       "text": "Lewis got ready for the trip by reading old maps of the western rivers.",
       "trap": "not-in-text",
       "why": "The passage does not mention old maps. It says Lewis learned to make his own maps."
      },
      {
       "text": "Lewis got ready for the trip by gathering rifles and a boat frame at an army workshop.",
       "trap": "detail",
       "why": "That happened, but it is only one stop. Most of the passage tells about other things Lewis did."
      }
     ]
    },
    {
     "id": "b4-i18-2",
     "order": 2,
     "format": "single",
     "area": "informational-key-ideas",
     "skill": "key-details",
     "prompt": "According to the passage, what did the plant expert in Philadelphia teach Lewis?",
     "key": 2,
     "evidence": [
      9
     ],
     "options": [
      {
       "text": "How to collect seeds and keep them from spoiling",
       "trap": "not-in-text",
       "why": "Seeds are not mentioned in the passage. Look at what the plant expert showed Lewis."
      },
      {
       "text": "How to treat illnesses with medicine made from plants",
       "trap": "word-lift",
       "why": "A doctor taught Lewis about illnesses, but the passage does not say he used plant medicines."
      },
      {
       "text": "How to press flowers flat between sheets of paper"
      },
      {
       "text": "How to tell which wild plants were safe to eat",
       "trap": "not-in-text",
       "why": "The passage never says Lewis learned which plants to eat. Reread the sentence about the plant expert."
      }
     ]
    },
    {
     "id": "b4-i18-3",
     "order": 3,
     "format": "single",
     "area": "informational-craft",
     "skill": "author-purpose",
     "prompt": "Why does the author tell about the iron boat in the last paragraph?",
     "key": 3,
     "evidence": [
      11,
      14
     ],
     "options": [
      {
       "text": "To show why the crew had to carry their supplies over land in Montana",
       "trap": "not-in-text",
       "why": "The passage never says how supplies were carried. It tells what happened to the boat itself."
      },
      {
       "text": "To show that Lewis's lessons helped the crew solve a problem on the trail",
       "trap": "opposite",
       "why": "The crew tried a fix, but the boat still leaked badly and was left behind."
      },
      {
       "text": "To show that the folding boat was too heavy to carry across the mountains",
       "trap": "not-in-text",
       "why": "The passage does not talk about the boat's weight. It says the problem was leaking."
      },
      {
       "text": "To show that one of Lewis's plans failed even after careful preparation"
      }
     ]
    },
    {
     "id": "b4-i18-4",
     "order": 4,
     "format": "sentence",
     "area": "informational-key-ideas",
     "skill": "cause-effect",
     "prompt": "Tap the sentence that tells why the crew could not seal the iron boat with pine pitch.",
     "keys": [
      13
     ],
     "why": "Look in the last paragraph, right after the crew puts the boat together."
    },
    {
     "id": "b4-i18-5",
     "order": 5,
     "format": "order",
     "area": "informational-key-ideas",
     "skill": "sequence",
     "prompt": "Put these events in the order they happened.",
     "why": "Look for the time words First, Next, Finally and Only after in the middle of the passage.",
     "steps": [
      "Workers build an iron frame for a folding boat.",
      "Lewis learns to measure his location by the stars.",
      "Lewis learns to treat illnesses and injuries.",
      "Lewis invites William Clark to share command."
     ]
    }
   ],
   "level": 1010
  },
  {
   "id": "b4-l01",
   "type": "literary",
   "genre": "story",
   "title": "What the Land Whispers",
   "band": "b4",
   "topics": [
    "arctic",
    "polar-regions",
    "ecosystems",
    "nature-earth"
   ],
   "paragraphs": [
    [
     "Siku pulled her hood tight and hurried across the tundra ahead of her grandmother.",
     "Her cousin had seen caribou crossing the far hill that morning, and Siku wanted to see them too.",
     "As far as she could tell, there was nothing out here but old snow and brown grass.",
     "Grandma Ana walked slowly, stopping every few steps to look at the ground."
    ],
    [
     "“Hurry, Grandma!” Siku called. “The herd will be gone!”",
     "Grandma Ana only smiled and knelt beside a flat gray rock.",
     "“The land is always talking,” she said, “but it whispers.”",
     "Siku sighed and walked back, kicking a chunk of ice.",
     "Then she crouched down and saw tiny purple flowers tucked against the rock, out of the wind."
    ],
    [
     "After that, Siku began to look more carefully at the ground around her.",
     "Near a pond still edged with ice, she spotted the small, neat tracks of an arctic fox.",
     "Farther on, she found a white feather caught on a willow branch no taller than her boot.",
     "Even at nine o'clock at night, the sun still hung above the hills."
    ],
    [
     "By the time they reached the far hill, the caribou had moved on.",
     "To her surprise, Siku found that she did not mind very much.",
     "She held up the feather and told her grandmother about every whisper she had heard."
    ]
   ],
   "items": [
    {
     "id": "b4-l01-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 0,
     "evidence": [
      2,
      8,
      9
     ],
     "options": [
      {
       "text": "Looking closely can show that a place that seems empty is full of life."
      },
      {
       "text": "Watching wild animals from a distance keeps both them and you safe.",
       "trap": "not-in-text",
       "why": "Siku never even sees the caribou. The story is about what she notices on the ground."
      },
      {
       "text": "Dressing well for the cold lets you enjoy being outside in any weather.",
       "trap": "detail",
       "why": "Siku pulls her hood tight, but that is one small detail. Think about what changes for her on the walk."
      },
      {
       "text": "Pushing hard to reach a goal can pay off when you get there.",
       "trap": "opposite",
       "why": "Siku rushes, but the caribou are gone when she arrives. She is happy because of other things she found."
      }
     ]
    },
    {
     "id": "b4-l01-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Why does Siku rush ahead of her grandmother at the start?",
     "key": 3,
     "evidence": [
      1
     ],
     "options": [
      {
       "text": "She is cold and wants to warm up by moving quickly.",
       "trap": "literal",
       "why": "She does pull her hood tight, but the story says she is hurrying to see something."
      },
      {
       "text": "She wants to get back home before the sun goes down.",
       "trap": "not-in-text",
       "why": "Siku is heading toward the far hill, not home. Look at what her cousin saw that morning."
      },
      {
       "text": "She wants to show her grandmother how fast she can walk.",
       "trap": "not-in-text",
       "why": "The story never says Siku is trying to show off. Look at what her cousin saw."
      },
      {
       "text": "She wants to see the caribou her cousin saw on the far hill."
      }
     ]
    },
    {
     "id": "b4-l01-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "At the start of the story, how does Siku see the tundra?",
     "key": 3,
     "evidence": [
      2
     ],
     "options": [
      {
       "text": "As a quiet place where she can listen to the soft wind",
       "trap": "word-lift",
       "why": "The story talks about whispers and wind, but Siku does not think of the land this way at first."
      },
      {
       "text": "As a place full of small living things to discover",
       "trap": "opposite",
       "why": "Siku learns this later. At first she thinks there is nothing out there but snow and grass."
      },
      {
       "text": "As a dangerous place where she must stay close to Grandma",
       "trap": "not-in-text",
       "why": "Siku runs ahead of her grandmother, so she does not seem worried about danger."
      },
      {
       "text": "As an empty place to cross on the way to something better"
      }
     ]
    },
    {
     "id": "b4-l01-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "Tap the sentence that shows the story happens at a time of year when Arctic days are very long.",
     "keys": [
      12
     ],
     "why": "Look for a sentence that tells about the clock and the sun."
    },
    {
     "id": "b4-l01-5",
     "order": 5,
     "format": "two-part",
     "area": "literary-craft",
     "skill": "figurative-language",
     "evidence": [
      8
     ],
     "a": {
      "prompt": "Part A: What does Grandma Ana mean when she says the land “whispers”?",
      "key": 0,
      "options": [
       {
        "text": "The land shows small things that are easy to walk right past."
       },
       {
        "text": "The land changes so slowly that people hardly ever notice it.",
        "trap": "not-in-text",
        "why": "The story never talks about the land changing over time. Siku notices things on one walk."
       },
       {
        "text": "The land holds old stories that only elders know how to hear.",
        "trap": "not-in-text",
        "why": "Grandma tells no old stories here. Siku hears the whispers herself by looking at the ground."
       },
       {
        "text": "The land gives quiet warnings about storms and thin ice.",
        "trap": "not-in-text",
        "why": "The story never talks about storms or thin ice. Think about the things Siku notices on her walk."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“By the time they reached the far hill, the caribou had moved on.”",
        "trap": "true-but",
        "why": "This tells what happened to the caribou, not what Siku noticed by looking closely."
       },
       {
        "text": "“Siku pulled her hood tight and hurried across the tundra ahead of her grandmother.”",
        "trap": "true-but",
        "why": "This shows Siku rushing. It happens before she learns what the land's whisper is."
       },
       {
        "text": "“Then she crouched down and saw tiny purple flowers tucked against the rock, out of the wind.”"
       },
       {
        "text": "“Siku sighed and walked back, kicking a chunk of ice.”",
        "trap": "true-but",
        "why": "This shows Siku is annoyed, but it does not show what the land's whisper is."
       }
      ]
     }
    }
   ],
   "level": 850
  },
  {
   "id": "b4-l02",
   "type": "literary",
   "genre": "story",
   "title": "Not Just a Puddle",
   "band": "b4",
   "topics": [
    "microscopes",
    "microbes",
    "biology",
    "science"
   ],
   "paragraphs": [
    [
     "Priya had one week to find something amazing for the Tiny Worlds table at the science fair.",
     "Her new microscope sat on her desk, and its silver knobs gleamed under the lamp.",
     "First she tried a pinch of salt, and the grains looked like tiny glass cubes.",
     "They were neat, but she was sure half the class would bring salt too."
    ],
    [
     "That evening her little brother Theo brought in a jar of cloudy park water.",
     "“Try mine,” he said, setting it carefully beside her notebook.",
     "“It's just a puddle, Theo,” Priya answered without even looking up."
    ],
    [
     "For the next three days, she tested everything else she could think of.",
     "Onion skin showed rows of cells stacked like bricks in a wall.",
     "A strand of her own hair looked like a rough, scaly rope.",
     "None of it felt amazing, and she began to worry that her table would be dull."
    ],
    [
     "On the last night, she finally squeezed one drop from the jar onto a glass slide.",
     "Something tiny and clear was spinning in circles, chasing green specks through the water.",
     "Priya gasped and kept turning the focus knob, afraid the creature would swim out of sight.",
     "Theo had only wanted to help, she realized, and she had not even looked."
    ],
    [
     "At the fair, a crowd gathered around her table all afternoon.",
     "Above the microscope hung a sign in her neatest handwriting: “Not Just a Puddle, Discovered by Theo.”"
    ]
   ],
   "items": [
    {
     "id": "b4-l02-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 2,
     "evidence": [
      6,
      14
     ],
     "options": [
      {
       "text": "Choosing something different from others helps you stand out.",
       "trap": "detail",
       "why": "Priya does worry about salt, but that is one small part. The lesson comes from what happens with Theo's jar."
      },
      {
       "text": "Trying many different things helps you find the best one.",
       "trap": "opposite",
       "why": "Priya tried many things, but none felt amazing. The best one was the very first thing Theo offered."
      },
      {
       "text": "Good ideas can come from people you might not expect."
      },
      {
       "text": "Taking your time helps you do careful, good work.",
       "trap": "not-in-text",
       "why": "The story never shows Priya working slowly to get things right. Think about where her best idea came from."
      }
     ]
    },
    {
     "id": "b4-l02-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "How do the words on Priya's sign connect to an earlier part of the story?",
     "key": 1,
     "evidence": [
      6,
      16
     ],
     "options": [
      {
       "text": "They echo Theo's words and show he was right all along.",
       "trap": "word-lift",
       "why": "Theo only said “Try mine.” The word “puddle” came from someone else earlier in the story."
      },
      {
       "text": "They echo Priya's words to Theo and show she now feels differently."
      },
      {
       "text": "They answer a question Priya's teacher asked at the start.",
       "trap": "not-in-text",
       "why": "No teacher asks a question in this story. Look for who first said the word “puddle.”"
      },
      {
       "text": "They repeat the name of the fair table from the first sentence.",
       "trap": "not-in-text",
       "why": "The table is called Tiny Worlds, but the sign does not use those words. Look at what the sign says."
      }
     ]
    },
    {
     "id": "b4-l02-3",
     "order": 3,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "What does Priya's sign at the fair show about her?",
     "key": 0,
     "evidence": [
      16
     ],
     "options": [
      {
       "text": "She wants Theo to get credit for what he found."
      },
      {
       "text": "She hopes people will think she found it alone.",
       "trap": "opposite",
       "why": "The sign names Theo as the one who discovered it. That is the opposite of keeping it for herself."
      },
      {
       "text": "She still thinks the puddle water is not special.",
       "trap": "opposite",
       "why": "The sign says “Not Just a Puddle.” Priya now thinks the water is special."
      },
      {
       "text": "She is proud of how neatly she can write.",
       "trap": "literal",
       "why": "The sign is neat, but that is not the point. Think about whose name she put on it."
      }
     ]
    },
    {
     "id": "b4-l02-4",
     "order": 4,
     "format": "order",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Put these events from the story in order.",
     "why": "Follow the story from the start and look for time words like “first,” “that evening,” and “on the last night.”",
     "steps": [
      "Priya looks at grains of salt.",
      "Theo brings Priya a jar of park water.",
      "Priya looks at a strand of her hair.",
      "Priya sees a creature spinning in a drop of water."
     ]
    },
    {
     "id": "b4-l02-5",
     "order": 5,
     "format": "multi",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "Pick two sentences that tell how this story is told.",
     "keys": [
      0,
      1
     ],
     "evidence": [
      10,
      14
     ],
     "options": [
      {
       "text": "The reader learns what Priya thinks and feels."
      },
      {
       "text": "A narrator who is not in the story tells it."
      },
      {
       "text": "Priya tells the story herself, using “I” and “me.”",
       "trap": "not-in-text",
       "why": "The story calls Priya “she” and “her.” She is not the one telling it."
      },
      {
       "text": "Theo tells the story about his older sister.",
       "trap": "not-in-text",
       "why": "Theo is a character in the story, but he does not tell it. Look at the words used for him."
      },
      {
       "text": "The reader learns Theo's private thoughts about the jar.",
       "trap": "not-in-text",
       "why": "We see what Theo does and says, but the story never tells his thoughts."
      }
     ]
    }
   ],
   "level": 920
  },
  {
   "id": "b4-l03",
   "type": "literary",
   "genre": "fable",
   "title": "Ferrin and the Water Tower",
   "band": "b4",
   "topics": [
    "steam-trains",
    "trains",
    "vehicles-engineering"
   ],
   "paragraphs": [
    [
     "Ferrin was the fastest engine on the Valley Line, and his brass bell shone like a second sun.",
     "Every morning he raced past Mill Crossing, where a tall wooden water tower stood beside the tracks.",
     "The other engines stopped there to fill their tanks, but Ferrin only whistled and rolled on.",
     "To him, the tower was nothing but a bent old giant that wasted good minutes."
    ],
    [
     "Dorrie, a squat freight engine with patched pipes, never skipped the tower.",
     "“A full tank is a full day,” she would say as the cool water splashed in.",
     "Ferrin laughed so hard that his smoke came out in puffs."
    ],
    [
     "One hot afternoon, Ferrin pulled six passenger cars toward Kettle Hill, the steepest climb on the line.",
     "Halfway up, his wheels began to slow, and his whistle sank to a weak hiss.",
     "His tank was nearly dry, and without water his boiler could not make steam.",
     "He stopped on the slope while the passengers peered out of the windows."
    ],
    [
     "Soon a low rumble came from below.",
     "Dorrie chugged up behind him, still dripping from Mill Crossing.",
     "She did not laugh at him or remind him of her saying.",
     "Instead, she coupled on and pushed until both engines reached the top."
    ],
    [
     "The next morning, the passengers at Mill Crossing heard a sound they had never heard before.",
     "Ferrin's brakes squealed, and he stopped beneath the old tower to drink."
    ]
   ],
   "items": [
    {
     "id": "b4-l03-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "What lesson does this story show?",
     "key": 2,
     "evidence": [
      3,
      9,
      16
     ],
     "options": [
      {
       "text": "Showing off your speed can cause you to lose your friends.",
       "trap": "opposite",
       "why": "Dorrie still helps Ferrin after he laughed at her, so he does not lose a friend."
      },
      {
       "text": "Fast helpers should slow down for those who fall behind.",
       "trap": "opposite",
       "why": "In this story, the slower engine helps the faster one, not the other way around."
      },
      {
       "text": "Stopping to get ready can save more time than it wastes."
      },
      {
       "text": "Slow and steady workers can win a long race in the end.",
       "trap": "not-in-text",
       "why": "No one runs a race in this story. Think about why Ferrin got stuck on the hill."
      }
     ]
    },
    {
     "id": "b4-l03-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Why did Ferrin stop halfway up Kettle Hill?",
     "key": 0,
     "evidence": [
      9
     ],
     "options": [
      {
       "text": "He had run too low on water to keep going."
      },
      {
       "text": "His six cars were too heavy for the steep climb.",
       "trap": "not-in-text",
       "why": "The cars are mentioned, but the story says the real problem was his tank."
      },
      {
       "text": "The hot afternoon made his boiler too warm to work.",
       "trap": "word-lift",
       "why": "The day was hot, but the story never says the heat stopped him."
      },
      {
       "text": "He had run too low on coal to keep his fire going.",
       "trap": "not-in-text",
       "why": "The story never talks about coal. Look at what it says about his tank."
      }
     ]
    },
    {
     "id": "b4-l03-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "How does the last paragraph connect to the first paragraph?",
     "key": 3,
     "evidence": [
      2,
      16
     ],
     "options": [
      {
       "text": "Ferrin repeats the words he once made fun of each day.",
       "trap": "not-in-text",
       "why": "Ferrin never says Dorrie's saying in the last paragraph. Look at what he does at Mill Crossing."
      },
      {
       "text": "Ferrin thanks the engine he once laughed at each day.",
       "trap": "not-in-text",
       "why": "The last paragraph never shows Ferrin thanking Dorrie. Look at where he stops."
      },
      {
       "text": "Ferrin waits for the slow engine he once left behind.",
       "trap": "not-in-text",
       "why": "The last paragraph does not mention Dorrie at all. Look at where Ferrin stops."
      },
      {
       "text": "Ferrin stops at the tower he once rolled past each day."
      }
     ]
    },
    {
     "id": "b4-l03-4",
     "order": 4,
     "format": "two-part",
     "area": "literary-key-ideas",
     "skill": "character",
     "evidence": [
      13,
      14
     ],
     "a": {
      "prompt": "Part A: How does Dorrie act when she reaches Ferrin on the hill?",
      "key": 1,
      "options": [
       {
        "text": "She fills his empty tank with water from her own tank.",
        "trap": "not-in-text",
        "why": "The story never says Dorrie shares her water. Look at how she gets him moving."
       },
       {
        "text": "She pushes him to the top without mentioning his mistake."
       },
       {
        "text": "She stays beside him until another engine comes to help.",
        "trap": "not-in-text",
        "why": "No other engine comes. Look at what Dorrie does as soon as she arrives."
       },
       {
        "text": "She pushes him to the top while gently repeating her advice.",
        "trap": "opposite",
        "why": "She does push him, but the story says she did not remind him of her saying."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“Soon a low rumble came from below.”",
        "trap": "true-but",
        "why": "This tells that someone is coming, but not how Dorrie acts."
       },
       {
        "text": "“Ferrin laughed so hard that his smoke came out in puffs.”",
        "trap": "true-but",
        "why": "This shows what Ferrin was like earlier, not what Dorrie is like."
       },
       {
        "text": "“She did not laugh at him or remind him of her saying.”"
       },
       {
        "text": "“Dorrie chugged up behind him, still dripping from Mill Crossing.”",
        "trap": "true-but",
        "why": "This tells where Dorrie came from, not how she treats Ferrin."
       }
      ]
     }
    },
    {
     "id": "b4-l03-5",
     "order": 5,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "Tap the sentence that shows how Ferrin thinks about the water tower at the start of the story.",
     "keys": [
      3
     ],
     "why": "Look in the first paragraph for a sentence that tells what the tower seems like to Ferrin."
    }
   ],
   "level": 970
  },
  {
   "id": "b4-l04",
   "type": "literary",
   "genre": "story",
   "title": "The Birdbath and the Water Lilies",
   "band": "b4",
   "topics": [
    "famous-artists",
    "drawing",
    "arts-entertainment"
   ],
   "paragraphs": [
    [
     "Priya crumpled her fifth copy of Claude Monet’s water lilies and tossed it toward the trash can.",
     "Each copy looked like a photo taken through a dirty window.",
     "The postcard leaning against her paint jar seemed perfect, and her paper never did."
    ],
    [
     "It had started on Monday, when Ms. Okafor passed out postcards of famous paintings in art class.",
     "Priya chose the pond with floating lilies because its blues and greens seemed to shimmer.",
     "She promised herself she would paint it exactly right by Friday."
    ],
    [
     "Now it was Thursday evening, and Uncle Teo stood in her doorway, glancing at the paper balls on the floor.",
     "“Did you know Monet painted the same haystacks again and again?” he asked.",
     "“He painted them at sunrise, at noon, and in the snow, because the light kept changing.”",
     "“He wasn’t copying anyone, Priya; he was looking,” Uncle Teo added."
    ],
    [
     "Priya thought about that while the sky outside turned gold.",
     "Then she grabbed her paints and hurried to the backyard, where the old birdbath glowed orange in the setting sun.",
     "She painted it quickly, before the color could fade.",
     "The next morning she painted it again, cool and silver under a pale sky."
    ],
    [
     "On Friday, Priya taped both birdbath paintings to the classroom board beside the postcard.",
     "The water lilies no longer looked like a test she kept failing.",
     "Now they looked like a friend who had shown her where to look."
    ]
   ],
   "items": [
    {
     "id": "b4-l04-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the story show?",
     "key": 0,
     "evidence": [
      9,
      16
     ],
     "options": [
      {
       "text": "Looking closely at the world around you can teach more than copying."
      },
      {
       "text": "Copying a famous painting again and again is a good way to improve.",
       "trap": "opposite",
       "why": "Priya's five copies only frustrate her. She grows by painting the birdbath she sees."
      },
      {
       "text": "Your own ideas can matter more than a teacher's rules.",
       "trap": "not-in-text",
       "why": "Ms. Okafor never gives any rules. Priya's trouble was trying to copy the postcard exactly."
      },
      {
       "text": "Finding your own style can take many years of hard practice.",
       "trap": "not-in-text",
       "why": "Priya finds a new way to paint in one evening, right after talking with her uncle."
      }
     ]
    },
    {
     "id": "b4-l04-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "At the end, the water lilies “looked like a friend who had shown her where to look.” What does this mean?",
     "key": 2,
     "evidence": [
      11,
      16
     ],
     "options": [
      {
       "text": "Monet’s painting had led Priya to paint a pond in the park near her school.",
       "trap": "not-in-text",
       "why": "The story never mentions a park. Priya paints something right in her own backyard."
      },
      {
       "text": "Monet’s painting had led Priya to paint the flowers in her family’s garden.",
       "trap": "not-in-text",
       "why": "Priya does not paint flowers. Look at what she paints at sunset and the next morning."
      },
      {
       "text": "Monet’s painting had led Priya to paint the birdbath in her own backyard."
      },
      {
       "text": "Monet’s painting had led Priya to paint the view from her bedroom window.",
       "trap": "word-lift",
       "why": "Priya sees the gold sky outside, but she hurries to the backyard to paint."
      }
     ]
    },
    {
     "id": "b4-l04-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "Why does the author show Priya painting the birdbath twice, at sunset and the next morning?",
     "key": 1,
     "evidence": [
      8,
      12,
      13
     ],
     "options": [
      {
       "text": "It shows her fixing the mistakes she saw in the first one.",
       "trap": "not-in-text",
       "why": "Priya is not fixing a mistake. She paints again because the light has changed."
      },
      {
       "text": "It shows her trying out the idea her uncle told her about."
      },
      {
       "text": "It shows her deciding which time of day she liked best.",
       "trap": "not-in-text",
       "why": "Priya never picks a favorite. She hangs both paintings side by side."
      },
      {
       "text": "It shows her following the steps her teacher gave the class.",
       "trap": "not-in-text",
       "why": "Ms. Okafor only handed out postcards. The idea of painting in new light came from someone else."
      }
     ]
    },
    {
     "id": "b4-l04-4",
     "order": 4,
     "format": "multi",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Which two phrases describe Priya? Pick two.",
     "keys": [
      2,
      4
     ],
     "evidence": [
      0,
      5,
      11
     ],
     "options": [
      {
       "text": "shy about showing her work",
       "trap": "opposite",
       "why": "Priya taped her paintings to the classroom board for everyone to see."
      },
      {
       "text": "eager to please her teacher",
       "trap": "not-in-text",
       "why": "The story never shows Priya thinking about what Ms. Okafor wants."
      },
      {
       "text": "set on being exact"
      },
      {
       "text": "careful to take her time",
       "trap": "opposite",
       "why": "Priya painted the birdbath quickly, before the color could fade."
      },
      {
       "text": "quick to try a new idea"
      }
     ]
    },
    {
     "id": "b4-l04-5",
     "order": 5,
     "format": "order",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Put these events in the order they happened.",
     "why": "The story starts in the middle and then jumps back. Look for time words like Monday, Thursday, and the next morning.",
     "steps": [
      "Ms. Okafor passes out postcards in art class.",
      "Priya crumples her fifth copy of the water lilies.",
      "Uncle Teo tells Priya about Monet’s haystacks.",
      "Priya paints the birdbath under a pale morning sky."
     ]
    }
   ],
   "level": 930
  },
  {
   "id": "b4-l05",
   "type": "literary",
   "genre": "poem",
   "title": "The Supper Riddle",
   "band": "b4",
   "topics": [
    "riddles",
    "puzzles",
    "games-hobbies"
   ],
   "paragraphs": [
    [
     "At supper Grandpa Teo leaned in close,",
     "his fork suspended over rice and beans.",
     "He murmured, \"I walk beside you without a sound,",
     "yet when the clouds roll in, I disappear.\""
    ],
    [
     "All night the riddle bumped around my head",
     "like a moth that will not leave the porch light.",
     "At breakfast I ventured, \"A cat?\" Grandpa smiled",
     "and only nodded toward the sunny floor."
    ],
    [
     "I puzzled over an echo, a whisper, and the restless wind.",
     "I nearly pleaded with my sister for a clue,",
     "but something stubborn made me hold my tongue."
    ],
    [
     "That afternoon I sprinted home along the sidewalk,",
     "and something dark kept racing at my feet,",
     "stretching long and imitating every stride."
    ],
    [
     "At supper I announced, \"A shadow!\" and Grandpa clapped,",
     "setting his fork down with a satisfied thump.",
     "I felt as tall as my own evening shadow",
     "and asked him eagerly, \"Do you have another one?\""
    ]
   ],
   "items": [
    {
     "id": "b4-l05-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the poem show?",
     "key": 0,
     "evidence": [
      10,
      14,
      16
     ],
     "options": [
      {
       "text": "Solving a puzzle yourself can feel better than being told the answer."
      },
      {
       "text": "Sharing supper together is a good way for a family to stay close.",
       "trap": "detail",
       "why": "The poem does happen at supper, but that's a detail. The lesson comes from how the riddle gets solved."
      },
      {
       "text": "Asking others for help can make a hard problem easier to solve.",
       "trap": "opposite",
       "why": "The speaker almost asked the sister for a clue but chose not to. The poem shows the opposite."
      },
      {
       "text": "Learning from older relatives helps keep family traditions alive.",
       "trap": "not-in-text",
       "why": "The poem never talks about traditions. Look at what the speaker does with the riddle and how it feels."
      }
     ]
    },
    {
     "id": "b4-l05-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "After the wrong guess at breakfast, what does Grandpa Teo do to keep the speaker working on the riddle?",
     "key": 0,
     "evidence": [
      6,
      7
     ],
     "options": [
      {
       "text": "He nods toward the sunny floor and says nothing."
      },
      {
       "text": "He tells the speaker to ask the sister for a clue.",
       "trap": "word-lift",
       "why": "The sister is mentioned in stanza 3, but asking her is the speaker's idea, not Grandpa's."
      },
      {
       "text": "He says the answer is something seen every day.",
       "trap": "not-in-text",
       "why": "Grandpa doesn't speak at all after the guess. Look at what he does instead in stanza 2."
      },
      {
       "text": "He repeats the riddle slowly, one line at a time.",
       "trap": "not-in-text",
       "why": "Grandpa doesn't say the riddle again at breakfast. Look at the last line of stanza 2."
      }
     ]
    },
    {
     "id": "b4-l05-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "In stanza 2, what does the poet mean by comparing the riddle to a moth?",
     "key": 1,
     "evidence": [
      4,
      5
     ],
     "options": [
      {
       "text": "A real moth kept the speaker awake by the porch light.",
       "trap": "literal",
       "why": "There is no real moth. The poet compares the riddle to a moth to show how it acted."
      },
      {
       "text": "The riddle kept coming back to the speaker's mind all night."
      },
      {
       "text": "The answer seemed to fly off whenever the speaker got close.",
       "trap": "opposite",
       "why": "The moth will not leave the light. That shows the riddle stayed, not that it flew away."
      },
      {
       "text": "The riddle lit up the speaker's thoughts like a bright lamp.",
       "trap": "word-lift",
       "why": "The poem mentions a porch light, but the riddle is the moth, not the light."
      }
     ]
    },
    {
     "id": "b4-l05-4",
     "order": 4,
     "format": "multi",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "Pick two sentences that tell how the poem is built.",
     "keys": [
      1,
      4
     ],
     "evidence": [
      0,
      8,
      12,
      14
     ],
     "options": [
      {
       "text": "The stanzas take turns between the speaker's and Grandpa's thoughts.",
       "trap": "not-in-text",
       "why": "The whole poem is told by the speaker. We never hear Grandpa's thoughts."
      },
      {
       "text": "The middle stanzas follow the speaker's guesses until the answer appears."
      },
      {
       "text": "Grandpa finally tells the answer in the very last stanza.",
       "trap": "opposite",
       "why": "In the last stanza, the speaker announces \"A shadow!\" Grandpa only claps."
      },
      {
       "text": "Each stanza begins with a brand-new riddle from Grandpa Teo.",
       "trap": "not-in-text",
       "why": "Grandpa asks only one riddle, in the first stanza. The rest of the poem is about solving it."
      },
      {
       "text": "The first and last stanzas both happen at supper with Grandpa."
      }
     ]
    },
    {
     "id": "b4-l05-5",
     "order": 5,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "Tap the line that uses a comparison to show how proud the speaker feels after solving the riddle.",
     "keys": [
      16
     ],
     "why": "Look in the last stanza, after the speaker says the answer at supper."
    }
   ],
   "level": 910
  },
  {
   "id": "b4-l07",
   "type": "literary",
   "genre": "story",
   "title": "The Sausage Tree",
   "band": "b4",
   "topics": [
    "leopard",
    "big-cats",
    "mammals",
    "animals"
   ],
   "paragraphs": [
    [
     "Tomas had promised his little sister a drawing of a real leopard, and this was his last morning in the reserve.",
     "Aunt Wanjiru parked the truck beside a dry riverbed as the sun climbed over the hills.",
     "For an hour, Tomas swept his binoculars across the golden grass, looking everywhere at once.",
     "His patience leaked away like water from a cracked cup.",
     "He drummed his fingers on the door and sighed again."
    ],
    [
     "Aunt Wanjiru did not seem to notice; she sat perfectly still, sipping tea and gazing at one tree.",
     "It was a sausage tree, its branches hung with long, heavy fruit.",
     "“That tree is keeping a secret,” she murmured.",
     "To Tomas, it looked like the most boring tree in Africa, with nothing in it but shade."
    ],
    [
     "Finally, he gave up and copied his aunt, resting his eyes on that one tree.",
     "Morning light slipped through the leaves and scattered gold and black patches over the bark.",
     "Slowly, the patches began to look strange.",
     "One long, dangling fruit was swaying gently, though there was no wind, and it had a dark curl at the tip.",
     "Tomas held his breath, because that was no fruit at all, but a tail.",
     "Above it, a leopard lay stretched along a branch, its spotted coat melting into the speckled shade."
    ],
    [
     "Tomas did not shout; instead, he opened his sketchbook and began to draw while the leopard dozed.",
     "Aunt Wanjiru smiled into her tea."
    ]
   ],
   "items": [
    {
     "id": "b4-l07-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 1,
     "evidence": [
      2,
      9,
      11
     ],
     "options": [
      {
       "text": "Sometimes staying calm and quiet near wild animals matters more than getting close.",
       "trap": "true-but",
       "why": "Tomas does stay quiet at the end, but that isn't the big idea. Think about what he changed to find the leopard."
      },
      {
       "text": "Sometimes you see more by watching one spot slowly than many spots quickly."
      },
      {
       "text": "Sometimes keeping a promise to family matters more than enjoying your trip.",
       "trap": "word-lift",
       "why": "Tomas did make a promise, but he never gives up any fun for it. Think about how he finally spots the leopard."
      },
      {
       "text": "Sometimes learning the names of plants helps you understand a new place.",
       "trap": "not-in-text",
       "why": "The story never shows Tomas learning plant names. Compare how he looked before and after he gave up searching."
      }
     ]
    },
    {
     "id": "b4-l07-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Why does Tomas want so badly to see a leopard?",
     "key": 3,
     "evidence": [
      0
     ],
     "options": [
      {
       "text": "He needs a photo of one for a school report.",
       "trap": "not-in-text",
       "why": "The story never mentions a school report. Look at the very first sentence."
      },
      {
       "text": "He wants to see one on his very first morning there.",
       "trap": "opposite",
       "why": "The story says this was his last morning in the reserve, not his first."
      },
      {
       "text": "He wants to prove he is a better spotter than his aunt.",
       "trap": "not-in-text",
       "why": "Tomas never tries to beat his aunt. The first sentence tells you who he is thinking about."
      },
      {
       "text": "He promised his little sister a drawing of one."
      }
     ]
    },
    {
     "id": "b4-l07-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "At first, how does Tomas see the sausage tree?",
     "key": 1,
     "evidence": [
      8
     ],
     "options": [
      {
       "text": "As a scary place he wants to stay away from",
       "trap": "not-in-text",
       "why": "Tomas is never afraid of the tree. Reread what he thinks it holds."
      },
      {
       "text": "As a dull tree with nothing worth watching"
      },
      {
       "text": "As a likely hiding place for a leopard",
       "trap": "opposite",
       "why": "Tomas thinks there is nothing in the tree but shade. He only finds the leopard later."
      },
      {
       "text": "As the perfect thing to draw for his sister",
       "trap": "not-in-text",
       "why": "Tomas wants to draw a leopard, not the tree. Reread how the tree looks to him."
      }
     ]
    },
    {
     "id": "b4-l07-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "Tap the two sentences that show how the light in the tree helped hide the leopard.",
     "keys": [
      10,
      14
     ],
     "why": "Look in the paragraph where Tomas stops searching everywhere and rests his eyes on one tree."
    },
    {
     "id": "b4-l07-5",
     "order": 5,
     "format": "two-part",
     "area": "literary-craft",
     "skill": "figurative-language",
     "evidence": [
      7,
      14
     ],
     "a": {
      "prompt": "Part A: When Aunt Wanjiru says “That tree is keeping a secret,” what does she mean?",
      "key": 2,
      "options": [
       {
        "text": "A leopard has stored its food up high among the long fruit.",
        "trap": "not-in-text",
        "why": "The story never shows any leopard food in the tree. Think about what the dark curl really was."
       },
       {
        "text": "A leopard left claw marks on the bark that only she can see.",
        "trap": "word-lift",
        "why": "The story mentions the bark, but only light patches are on it. Think about what Tomas sees swaying with no wind."
       },
       {
        "text": "A leopard is lying in the branches, hard to see among the leaves."
       },
       {
        "text": "A leopard has hidden its cubs in the tall grass under the tree.",
        "trap": "not-in-text",
        "why": "The story never mentions cubs. Think about what the swaying “fruit” turns out to be."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“It was a sausage tree, its branches hung with long, heavy fruit.”",
        "trap": "true-but",
        "why": "This describes the tree's fruit, but it does not show what the tree was hiding."
       },
       {
        "text": "“Aunt Wanjiru parked the truck beside a dry riverbed as the sun climbed over the hills.”",
        "trap": "true-but",
        "why": "This tells where and when they stopped. It does not show the tree's secret."
       },
       {
        "text": "“Above it, a leopard lay stretched along a branch, its spotted coat melting into the speckled shade.”"
       },
       {
        "text": "“To Tomas, it looked like the most boring tree in Africa, with nothing in it but shade.”",
        "trap": "true-but",
        "why": "This shows what Tomas thinks at first, not what is really in the tree."
       }
      ]
     }
    }
   ],
   "level": 970
  },
  {
   "id": "b4-l08",
   "type": "literary",
   "genre": "fable",
   "title": "Earth and the Bright Neighbor",
   "band": "b4",
   "topics": [
    "earth-planet",
    "planets",
    "space"
   ],
   "paragraphs": [
    [
     "Every evening, Earth watched Venus blaze in the sky, brighter than any star.",
     "Its own coat of blue water and swirling white clouds seemed plain beside such dazzle.",
     "“Nobody ever admires me,” Earth grumbled to the Moon as they circled the Sun together."
    ],
    [
     "The Moon, who had heard this complaint many times, suggested that Earth ask the Sun for help.",
     "So Earth called out, “Please pull me closer, so I can shine the way Venus does!”"
    ],
    [
     "Before the Sun could answer, Venus spoke from behind its thick yellow clouds.",
     "“You would not like it here,” Venus said in a tired, crackling voice.",
     "“My ground is hotter than any oven, and no rain ever reaches it.”",
     "“I would trade all my glow for one ocean like yours.”"
    ],
    [
     "Then the Sun spoke in a deep, warm voice.",
     "“If I pulled you closer, your seas would boil away into the sky.”",
     "“Where you are now, third from me, you are neither too hot nor too cold.”",
     "“That distance is exactly why your oceans stay liquid and your forests grow.”"
    ],
    [
     "Earth was quiet for a long time.",
     "It turned slowly and looked at itself for the first time in ages.",
     "Whales were singing under the waves, and rain was drumming on a green hillside.",
     "When the next sunrise spilled gold across the Pacific, Earth did not glance toward Venus once."
    ]
   ],
   "items": [
    {
     "id": "b4-l08-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "What lesson does this story show?",
     "key": 0,
     "evidence": [
      8,
      14,
      16
     ],
     "options": [
      {
       "text": "Wishing to be like someone else can keep you from seeing your own gifts."
      },
      {
       "text": "Asking others for help is a good way to get what you want.",
       "trap": "literal",
       "why": "Earth does ask for help, but it never gets what it asked for. It learns something else instead."
      },
      {
       "text": "Sharing what you have can make a friend's life much better.",
       "trap": "not-in-text",
       "why": "Venus wishes for an ocean, but Earth never shares anything with Venus in the story."
      },
      {
       "text": "Listening to a wise friend's warning can keep you out of danger.",
       "trap": "true-but",
       "why": "The Sun does warn Earth, but the big idea is how Earth finally sees the value of its own oceans and forests."
      }
     ]
    },
    {
     "id": "b4-l08-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Which word best describes Earth at the beginning of the story?",
     "key": 2,
     "evidence": [
      0,
      1
     ],
     "options": [
      {
       "text": "lonely",
       "trap": "literal",
       "why": "Earth says nobody admires it, but the Moon is right there with it. Earth's real trouble is wanting what Venus has."
      },
      {
       "text": "curious",
       "trap": "not-in-text",
       "why": "Earth does not ask questions to learn things. It watches Venus and grumbles about its own looks."
      },
      {
       "text": "envious"
      },
      {
       "text": "proud",
       "trap": "opposite",
       "why": "Earth thinks its own blue water and clouds look plain, so it is not proud of itself at the start."
      }
     ]
    },
    {
     "id": "b4-l08-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "How does Venus see Earth differently from the way Earth sees itself?",
     "key": 2,
     "evidence": [
      1,
      8
     ],
     "options": [
      {
       "text": "Venus thinks Earth is too far away, but Earth thinks it is too close.",
       "trap": "not-in-text",
       "why": "Venus never talks about how far away Earth is. Look at what Venus says it would trade for."
      },
      {
       "text": "Venus thinks Earth shines brightly, but Earth thinks it looks dim.",
       "trap": "word-lift",
       "why": "Venus talks about its own glow, not Earth's. What Venus wants from Earth is its ocean."
      },
      {
       "text": "Venus thinks Earth's water is a treasure, but Earth thinks it looks plain."
      },
      {
       "text": "Venus thinks Earth is too hot, but Earth thinks it feels cool.",
       "trap": "word-lift",
       "why": "The word hot is about Venus's own ground. Venus never says Earth is too hot."
      }
     ]
    },
    {
     "id": "b4-l08-4",
     "order": 4,
     "format": "order",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Put these events from the story in order.",
     "why": "Look for time words such as \"Before the Sun could answer\" and \"Then\" to see who speaks first.",
     "steps": [
      "Earth complains to the Moon that nobody admires it.",
      "Venus describes its hot ground where no rain falls.",
      "The Sun explains why Earth's place keeps its oceans liquid.",
      "Earth watches a sunrise without looking at Venus."
     ]
    },
    {
     "id": "b4-l08-5",
     "order": 5,
     "format": "multi",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "Why does Earth's place in space matter in the story? Pick two.",
     "keys": [
      0,
      2
     ],
     "evidence": [
      10,
      12
     ],
     "options": [
      {
       "text": "It keeps Earth's oceans from boiling away."
      },
      {
       "text": "It lets Earth shine brighter than any star.",
       "trap": "opposite",
       "why": "The story says Venus is the one that blazes brighter than any star, not Earth."
      },
      {
       "text": "It lets forests grow on Earth."
      },
      {
       "text": "It keeps the Moon from drifting away.",
       "trap": "not-in-text",
       "why": "The Moon circles the Sun with Earth, but the story never says Earth's place keeps it close."
      },
      {
       "text": "It keeps Earth safe behind thick yellow clouds.",
       "trap": "word-lift",
       "why": "The thick yellow clouds belong to Venus. Earth has swirling white clouds."
      }
     ]
    }
   ],
   "level": 860
  },
  {
   "id": "b4-l09",
   "type": "literary",
   "genre": "story",
   "title": "The Sunflower in the Corner",
   "band": "b4",
   "topics": [
    "web-design",
    "coding",
    "technology"
   ],
   "paragraphs": [
    [
     "Lena spent three evenings building a website for the Maple Street Garden seed swap.",
     "At the top of the page, a cartoon sunflower spun in circles while banjo music played.",
     "Below it, rainbow buttons flashed, and tiny bees zoomed across the screen.",
     "She was sure it was the best page anyone on Maple Street had ever seen."
    ],
    [
     "On Thursday afternoon, she carried her laptop to the garden to show Mr. Okafor, who ran the swap.",
     "They sat on the bench beside the tomato beds, the laptop balanced on his knees.",
     "Mr. Okafor smiled at the sunflower and said, “Very pretty.”",
     "He squinted at the flashing buttons and scrolled down, then up, then down again.",
     "At first Lena thought, The afternoon sun must be shining too brightly on the screen.",
     "Finally he asked, “So what day is the swap?”"
    ],
    [
     "Lena opened her mouth to answer, then closed it.",
     "The date was there, but it was hidden in small gray letters at the very bottom.",
     "That night she turned off the banjo music and stopped the buttons from flashing.",
     "She typed the date and place at the top in large, dark letters: Saturday, nine o'clock, by the garden gate.",
     "She did keep the sunflower, but she made it small and tucked it into a corner."
    ],
    [
     "On Saturday, more than forty neighbors came through the gate carrying envelopes of seeds.",
     "On Lena's screen at home, the little sunflower was still spinning in its corner, right where it belonged."
    ]
   ],
   "items": [
    {
     "id": "b4-l09-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 1,
     "evidence": [
      11,
      13,
      15
     ],
     "options": [
      {
       "text": "Adding creative touches makes a project more special.",
       "trap": "opposite",
       "why": "Lena's fancy extras actually hid the date. She had to make the page plainer."
      },
      {
       "text": "Things you make should be easy for others to use."
      },
      {
       "text": "Sharing what you grow can bring neighbors together.",
       "trap": "detail",
       "why": "The seed swap is part of the story, but Lena's lesson is about her website."
      },
      {
       "text": "Grown-ups can teach kids by giving them advice.",
       "trap": "not-in-text",
       "why": "Mr. Okafor never gives Lena advice. She figures out the problem by watching him."
      }
     ]
    },
    {
     "id": "b4-l09-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "How is the third paragraph different from the first paragraph?",
     "key": 0,
     "evidence": [
      1,
      2,
      13
     ],
     "options": [
      {
       "text": "The first shows what Lena added for fun; the third shows her making the date easy to find."
      },
      {
       "text": "The first shows a page with no date; the third shows Lena adding the date for the first time.",
       "trap": "opposite",
       "why": "The date was on the page from the start. It was just hidden in small gray letters at the bottom."
      },
      {
       "text": "The first shows Lena working alone; the third shows Mr. Okafor helping her fix the page.",
       "trap": "not-in-text",
       "why": "Lena fixes the page by herself that night. Mr. Okafor only asks one question."
      },
      {
       "text": "The first shows Lena unsure about her page; the third shows her feeling proud of her changes.",
       "trap": "opposite",
       "why": "In the first paragraph, Lena was sure her page was the best on Maple Street."
      }
     ]
    },
    {
     "id": "b4-l09-3",
     "order": 3,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Why does Lena change her website?",
     "key": 2,
     "evidence": [
      9,
      11
     ],
     "options": [
      {
       "text": "She wanted the page to load faster on older computers.",
       "trap": "not-in-text",
       "why": "The story never talks about how fast the page loads."
      },
      {
       "text": "Mr. Okafor told her the music and buttons were too much.",
       "trap": "not-in-text",
       "why": "Mr. Okafor never complains. Look at what Lena notices after he asks his question."
      },
      {
       "text": "She noticed the swap's date was hard to find on it."
      },
      {
       "text": "She decided she no longer liked the spinning sunflower.",
       "trap": "opposite",
       "why": "Lena kept the sunflower. She only made it smaller."
      }
     ]
    },
    {
     "id": "b4-l09-4",
     "order": 4,
     "format": "two-part",
     "area": "literary-craft",
     "skill": "point-of-view",
     "evidence": [
      8
     ],
     "a": {
      "prompt": "Part A: At first, how does Lena explain why Mr. Okafor is having trouble with her website?",
      "key": 1,
      "options": [
       {
        "text": "She thinks he forgot to bring his reading glasses.",
        "trap": "not-in-text",
        "why": "He squints, but the story never says Lena thinks about glasses."
       },
       {
        "text": "She thinks the sun is making the screen hard to see."
       },
       {
        "text": "She thinks her page is too hard to read.",
        "trap": "true-but",
        "why": "Lena figures that out later. The question asks what she thought at first."
       },
       {
        "text": "She thinks he is not used to using computers.",
        "trap": "not-in-text",
        "why": "The story never says Lena thinks this. Check what she first blames for his trouble."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 1,
      "options": [
       {
        "text": "“She was sure it was the best page anyone on Maple Street had ever seen.”",
        "trap": "true-but",
        "why": "This shows Lena was proud, but it comes before Mr. Okafor tries the page."
       },
       {
        "text": "“At first Lena thought, The afternoon sun must be shining too brightly on the screen.”"
       },
       {
        "text": "“He squinted at the flashing buttons and scrolled down, then up, then down again.”",
        "trap": "true-but",
        "why": "This shows his trouble, but not what Lena thought was causing it."
       },
       {
        "text": "“The date was there, but it was hidden in small gray letters at the very bottom.”",
        "trap": "true-but",
        "why": "This is what Lena realizes later, not her first idea."
       }
      ]
     }
    },
    {
     "id": "b4-l09-5",
     "order": 5,
     "format": "sentence",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "Tap the sentence that tells the exact spot where Lena and Mr. Okafor sit while he tries her website.",
     "keys": [
      5
     ],
     "why": "Look in the second paragraph for the sentence about where they sit down together."
    }
   ],
   "level": 940
  },
  {
   "id": "b4-l10",
   "type": "literary",
   "genre": "poem",
   "title": "The Crooked Lantern",
   "band": "b4",
   "topics": [
    "china-today",
    "countries-cultures",
    "people-places"
   ],
   "paragraphs": [
    [
     "It was the night before the Lantern Festival in our town.",
     "Grandpa and I bent thin sticks of bamboo",
     "and folded red paper in his yard.",
     "My lantern leaned to one side",
     "like a tired duck asleep on one leg."
    ],
    [
     "At the market, lanterns hung in perfect rows,",
     "as round and smooth as ripe oranges.",
     "I hid mine behind the water jar, ashamed of its crooked shape."
    ],
    [
     "Grandpa did not say a word.",
     "He found my lantern and set a small candle inside.",
     "Then he hung it from the lowest branch of the tree,",
     "right next to his own lantern with its patched hole."
    ],
    [
     "The first full moon of the new year rose,",
     "and the whole yard filled with red light.",
     "I could not tell which light was mine",
     "until my cousin Mei pointed and said,",
     "\"That one shines the warmest.\""
    ]
   ],
   "items": [
    {
     "id": "b4-l10-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the poem show?",
     "key": 3,
     "evidence": [
      14,
      16
     ],
     "options": [
      {
       "text": "Asking a family member for help makes a hard job much easier.",
       "trap": "not-in-text",
       "why": "The speaker never asks for help. Grandpa finds the hidden lantern on his own."
      },
      {
       "text": "Old family traditions are worth keeping alive for the next generation.",
       "trap": "too-broad",
       "why": "The poem takes place at a festival, but its events are about the crooked lantern, not about keeping traditions."
      },
      {
       "text": "Careful practice helps a person get much better at a hard skill.",
       "trap": "not-in-text",
       "why": "The speaker never practices or makes a better lantern. The same crooked lantern ends up shining."
      },
      {
       "text": "Something made with care does not need to be perfect to be worth sharing."
      }
     ]
    },
    {
     "id": "b4-l10-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "How does Grandpa show what he thinks of the speaker's crooked lantern?",
     "key": 2,
     "evidence": [
      8,
      10,
      11
     ],
     "options": [
      {
       "text": "He trades it for a round lantern from the market.",
       "trap": "word-lift",
       "why": "The market lanterns are in stanza 2, but Grandpa never buys or trades for one."
      },
      {
       "text": "He gently bends the frame until the lantern stands straight.",
       "trap": "not-in-text",
       "why": "Grandpa never changes the lantern's shape. He only adds a candle and hangs it up."
      },
      {
       "text": "He hangs it beside his own patched lantern without a word."
      },
      {
       "text": "He tells the speaker that crooked lanterns bring good luck.",
       "trap": "opposite",
       "why": "Grandpa does not tell the speaker anything. Stanza 3 says he did not say a word."
      }
     ]
    },
    {
     "id": "b4-l10-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "In stanza 1, the speaker says the lantern was \"like a tired duck asleep on one leg.\" What does this comparison mean?",
     "key": 1,
     "evidence": [
      3,
      4
     ],
     "options": [
      {
       "text": "The lantern drooped low, as if it were sleepy.",
       "trap": "word-lift",
       "why": "The lantern is not really tired. Look at the line just before the duck to see what was wrong with it."
      },
      {
       "text": "The lantern's frame tipped over to one side."
      },
      {
       "text": "The lantern sat very still and quiet in the yard.",
       "trap": "not-in-text",
       "why": "The poem never says the lantern was still. The duck picture describes its shape."
      },
      {
       "text": "The lantern balanced on one thin bamboo stick.",
       "trap": "literal",
       "why": "The duck's one leg is not a real stick. The line before tells how the lantern looked."
      }
     ]
    },
    {
     "id": "b4-l10-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "In stanza 2, the speaker hides the lantern because of its shape. Tap the line in the last stanza that shows this worry was not needed.",
     "keys": [
      14,
      16
     ],
     "why": "Look in the last stanza for a line about how the lit lantern compares with the others."
    },
    {
     "id": "b4-l10-5",
     "order": 5,
     "format": "two-part",
     "area": "literary-craft",
     "skill": "point-of-view",
     "evidence": [
      7
     ],
     "a": {
      "prompt": "Part A: In stanza 2, how does the speaker see the lantern?",
      "key": 2,
      "options": [
       {
        "text": "as a fragile thing to keep safe from the wind",
        "trap": "not-in-text",
        "why": "The poem never mentions wind. The speaker hides the lantern for a different reason."
       },
       {
        "text": "as a surprise to keep hidden from Grandpa until the festival",
        "trap": "word-lift",
        "why": "The speaker does hide it, but not as a surprise. Read the rest of that line to see why."
       },
       {
        "text": "as too crooked to compare with lanterns from the market"
       },
       {
        "text": "as a plain lantern that still needed more decoration",
        "trap": "not-in-text",
        "why": "The poem never says the lantern needed decoration. The speaker worries about its shape."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 1,
      "options": [
       {
        "text": "“right next to his own lantern with its patched hole.”",
        "trap": "true-but",
        "why": "This line describes Grandpa's lantern, not the speaker's feelings about the crooked one."
       },
       {
        "text": "“I hid mine behind the water jar, ashamed of its crooked shape.”"
       },
       {
        "text": "“He found my lantern and set a small candle inside.”",
        "trap": "true-but",
        "why": "This line is about what Grandpa does, not about how the speaker sees the lantern."
       },
       {
        "text": "“It was the night before the Lantern Festival in our town.”",
        "trap": "true-but",
        "why": "This line tells when the poem happens, not how the speaker feels about the lantern."
       }
      ]
     }
    }
   ],
   "level": 900
  },
  {
   "id": "b4-l11",
   "type": "literary",
   "genre": "story",
   "title": "Hand-Me-Down Wheels",
   "band": "b4",
   "topics": [
    "scooters",
    "skateboarding",
    "sports"
   ],
   "paragraphs": [
    [
     "When Aunt Rosa's van pulled into the driveway, Kofi hoped she had brought a brand-new scooter.",
     "Instead, his cousin Ama climbed out carrying her old one, its blue paint scratched and its handle grips worn smooth.",
     "“It's yours now,” Ama said, grinning as she set it on the porch.",
     "Kofi thanked her, but his smile stayed on the outside, like a sticker on a lunchbox.",
     "He had pictured something shiny, like the silver scooter his friend Lena rode to school."
    ],
    [
     "That afternoon, Kofi pushed the old scooter to the end of the block without much hope.",
     "Under the deck, he found a folded card held on with tape.",
     "In Ama's neat handwriting, it said, “I put on new wheels last spring, so it should roll well.”",
     "Kofi pushed off with one foot and gasped.",
     "The scooter glided across the cracked pavement as smoothly as a skater on fresh ice."
    ],
    [
     "At the park, Lena's silver scooter rattled over every bump, and she stopped to rub her sore hands.",
     "Kofi coasted up beside her and offered to trade scooters for one lap.",
     "When Lena climbed off his scooter, her eyes were wide.",
     "“Yours rides like a dream,” she said.",
     "Kofi looked down at the scratches and smiled, because now they seemed like marks from Ama's adventures.",
     "That evening, he wrote his cousin a thank-you note, and this time he meant every word."
    ]
   ],
   "items": [
    {
     "id": "b4-l11-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 2,
     "evidence": [
      9,
      14
     ],
     "options": [
      {
       "text": "Trying a new place can lead to a fun surprise.",
       "trap": "not-in-text",
       "why": "The surprise comes from the scooter, not from a new place. Look at what changes Kofi's mind."
      },
      {
       "text": "Practicing a new skill takes time and patience.",
       "trap": "not-in-text",
       "why": "Kofi rides well right away. The story is about how he comes to see the old scooter."
      },
      {
       "text": "Something that looks worn can still be worth a lot."
      },
      {
       "text": "Good friends share what they have with each other.",
       "trap": "detail",
       "why": "Kofi does trade for one lap, but that is one part. The whole story is about the old scooter's value."
      }
     ]
    },
    {
     "id": "b4-l11-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "In paragraph 1, Kofi's smile \"stayed on the outside, like a sticker on a lunchbox.\" What does this show?",
     "key": 3,
     "evidence": [
      3,
      4
     ],
     "options": [
      {
       "text": "He secretly felt nervous about riding on busy streets.",
       "trap": "not-in-text",
       "why": "Busy streets never come up in the story. The next sentence tells what Kofi was really thinking."
      },
      {
       "text": "He secretly worried his friends would laugh at its scratches.",
       "trap": "not-in-text",
       "why": "The story never says Kofi feared being laughed at. Read the sentence right after the smile."
      },
      {
       "text": "He secretly felt bad that his cousin was giving it away.",
       "trap": "not-in-text",
       "why": "Ama is grinning, and Kofi isn't sad for her. Look at what Kofi had pictured instead."
      },
      {
       "text": "He secretly wished it looked like his friend's scooter."
      }
     ]
    },
    {
     "id": "b4-l11-3",
     "order": 3,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Why does the old scooter roll so smoothly?",
     "key": 1,
     "evidence": [
      7
     ],
     "options": [
      {
       "text": "Kofi had oiled the wheels that same morning.",
       "trap": "not-in-text",
       "why": "The story never says Kofi oiled anything. Check the card under the deck."
      },
      {
       "text": "Ama had put new wheels on it last spring."
      },
      {
       "text": "The path near Kofi's house was freshly paved.",
       "trap": "opposite",
       "why": "The story says the pavement was cracked. The smooth ride came from something else."
      },
      {
       "text": "Aunt Rosa had fixed the handles in the van.",
       "trap": "word-lift",
       "why": "Aunt Rosa and the handles are in the story, but she fixed nothing. Read Ama's card."
      }
     ]
    },
    {
     "id": "b4-l11-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "At the start, Kofi is unhappy with the old scooter. Tap a sentence near the end that shows his feelings have changed.",
     "keys": [
      14,
      15
     ],
     "why": "Look in the last paragraph for what Kofi thinks or does after Lena rides his scooter."
    },
    {
     "id": "b4-l11-5",
     "order": 5,
     "format": "multi",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Which two phrases describe Kofi in this story? Pick two.",
     "keys": [
      0,
      2
     ],
     "evidence": [
      3,
      11
     ],
     "options": [
      {
       "text": "polite even when he feels let down"
      },
      {
       "text": "good at fixing things on his own",
       "trap": "word-lift",
       "why": "The scooter was fixed, but Ama put on the new wheels, not Kofi. Read her card again."
      },
      {
       "text": "willing to share what he has"
      },
      {
       "text": "proud of how fast he can ride",
       "trap": "not-in-text",
       "why": "Kofi never talks about speed or brags. He lets Lena try his scooter instead."
      },
      {
       "text": "patient while learning a new trick",
       "trap": "not-in-text",
       "why": "Kofi never learns a trick in the story. Look at how he treats Ama and Lena."
      }
     ]
    }
   ],
   "level": 1010
  },
  {
   "id": "b4-l12",
   "type": "literary",
   "genre": "story",
   "title": "One Letter at a Time",
   "band": "b4",
   "topics": [
    "great-wall-of-china",
    "ancient-china",
    "ancient-world",
    "history"
   ],
   "paragraphs": [
    [
     "Mei sat on a crooked stone step of the Great Wall, rubbing her aching legs.",
     "Her legs felt as heavy as two sacks of wet rice."
    ],
    [
     "An hour earlier, she had shouted to Grandpa Wei that she would be first to the seventh watchtower.",
     "Then she had raced ahead, counting each tower out loud as she passed it.",
     "But the wall did not lie flat like a road.",
     "It climbed the mountain ridge in steep, uneven steps, some nearly as tall as her knees.",
     "By the third tower, her breath came in short, painful gasps."
    ],
    [
     "Now Grandpa Wei climbed up, sat beside her, and tapped a brick near her shoe.",
     "Mei leaned closer and noticed a small fingerprint pressed deep into the old clay.",
     "“A worker left that mark hundreds of years ago,” Grandpa said.",
     "“This wall is a long sentence, written one letter at a time.”"
    ],
    [
     "Mei looked up the ridge, where gray fog had rolled in while she rested.",
     "It had swallowed every tower past the fourth, and the seventh was nowhere in sight.",
     "She stood up, but this time she did not count towers.",
     "Instead, she counted steps and rested for one breath at every tenth step, while Grandpa matched her pace."
    ],
    [
     "When they finally reached the seventh tower, Mei did not feel like the winner of a race.",
     "She felt like a worker who had just set the last brick in place."
    ]
   ],
   "items": [
    {
     "id": "b4-l12-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the story show?",
     "key": 0,
     "evidence": [
      13,
      14
     ],
     "options": [
      {
       "text": "A big job feels easier when you think about just the next small piece."
      },
      {
       "text": "Keeping a promise matters, even when it becomes hard to do.",
       "trap": "not-in-text",
       "why": "Mei does not keep her plan to be first, and the story does not praise it. Look at how she climbs later."
      },
      {
       "text": "Asking for help can make a hard climb feel much shorter.",
       "trap": "not-in-text",
       "why": "Mei never asks anyone for help. Look at what she starts counting after she rests."
      },
      {
       "text": "Slowing down helps you notice small things that others rush past.",
       "trap": "detail",
       "why": "Mei does notice the fingerprint, but that is one moment. Look at how she changes the way she climbs."
      }
     ]
    },
    {
     "id": "b4-l12-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "How does the fog matter in the story?",
     "key": 2,
     "evidence": [
      12,
      13
     ],
     "options": [
      {
       "text": "It hides the steep drop below, so Mei stops feeling afraid of the height.",
       "trap": "not-in-text",
       "why": "The story never says Mei is afraid of heights. Look at what the fog covers up the ridge."
      },
      {
       "text": "It makes the stones damp, so Mei slows down to keep from slipping on them.",
       "trap": "not-in-text",
       "why": "The story never says the stones are wet or slippery. Look at what Mei can no longer see."
      },
      {
       "text": "It hides the towers ahead, so Mei stops thinking about how many are left."
      },
      {
       "text": "It hides the path behind her, so Mei stops thinking about turning back.",
       "trap": "not-in-text",
       "why": "The fog covers towers up the ridge, not the path behind. Mei never thinks about turning back."
      }
     ]
    },
    {
     "id": "b4-l12-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "Grandpa says the wall is “a long sentence.” What does he mean?",
     "key": 0,
     "evidence": [
      7,
      10
     ],
     "options": [
      {
       "text": "It was built from many small pieces, added one after another."
      },
      {
       "text": "It is not finished yet, and more parts still need to be added.",
       "trap": "not-in-text",
       "why": "Grandpa never says the wall needs more parts. He is talking about how it was put together."
      },
      {
       "text": "It stretches so far that no one can see all of it at once.",
       "trap": "not-in-text",
       "why": "The fog hides towers later, but Grandpa's words are about how the wall was made."
      },
      {
       "text": "It tells the story of the people who lived there long ago.",
       "trap": "not-in-text",
       "why": "Grandpa is not talking about a story. He has just tapped one brick and says “one letter at a time.”"
      }
     ]
    },
    {
     "id": "b4-l12-4",
     "order": 4,
     "format": "two-part",
     "area": "literary-craft",
     "skill": "structure",
     "evidence": [
      8,
      16
     ],
     "a": {
      "prompt": "Part A: How does the last sentence of the story connect to an earlier part?",
      "key": 3,
      "options": [
       {
        "text": "It links Mei to the fog that rolled in while she was resting.",
        "trap": "not-in-text",
        "why": "The last sentence says nothing about fog. Look at who Mei feels like at the end."
       },
       {
        "text": "It links Mei to the aching legs she rubbed on the stone step.",
        "trap": "not-in-text",
        "why": "The last sentence is not about Mei's legs. Think about who set bricks in the wall."
       },
       {
        "text": "It links Mei to the race she shouted about at the very start.",
        "trap": "true-but",
        "why": "The sentence before talks about the race. The last sentence compares Mei to someone else."
       },
       {
        "text": "It links Mei to the worker whose fingerprint Grandpa showed her."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 2,
      "options": [
       {
        "text": "“Mei looked up the ridge, where gray fog had rolled in while she rested.”",
        "trap": "true-but",
        "why": "This tells about the weather. It does not show where the worker idea comes from."
       },
       {
        "text": "“Then she had raced ahead, counting each tower out loud as she passed it.”",
        "trap": "true-but",
        "why": "This is about the race at the start, not the worker Mei feels like at the end."
       },
       {
        "text": "“Mei leaned closer and noticed a small fingerprint pressed deep into the old clay.”"
       },
       {
        "text": "“Mei sat on a crooked stone step of the Great Wall, rubbing her aching legs.”",
        "trap": "true-but",
        "why": "This is how the story opens, but it says nothing about a worker."
       }
      ]
     }
    },
    {
     "id": "b4-l12-5",
     "order": 5,
     "format": "order",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Put these events in the order they happened.",
     "why": "The story starts in the middle. Look for the words “An hour earlier” and “Now” to find what happened first.",
     "steps": [
      "Mei shouts that she will be first to the seventh watchtower.",
      "Mei sits on a step, rubbing her aching legs.",
      "Grandpa shows Mei a fingerprint in a brick.",
      "Mei counts her steps and rests at every tenth one."
     ]
    }
   ],
   "level": 930
  },
  {
   "id": "b4-l13",
   "type": "literary",
   "genre": "story",
   "title": "Doing Nothing",
   "band": "b4",
   "topics": [
    "veterinarians",
    "jobs",
    "money-careers"
   ],
   "paragraphs": [
    [
     "Every Saturday, Leo helped his aunt, Dr. Ramos, at her animal clinic on Pine Street.",
     "This morning the waiting room was louder than a school cafeteria at lunchtime.",
     "In the corner, a girl named Hana held a carrier with a gray rabbit inside."
    ],
    [
     "\"Biscuit is here for a checkup, but she won't come out,\" Hana said softly.",
     "Eager to be useful, Leo knelt and reached straight into the carrier to pet her.",
     "Biscuit thumped her back foot and pressed herself against the far wall.",
     "Leo could see her sides moving fast, like a tiny engine that would not slow down.",
     "His cheeks felt hot, because he had only wanted to help."
    ],
    [
     "Dr. Ramos carried the carrier into the supply room in back.",
     "Bales of hay for the clinic's guinea pigs filled the air with a sweet, dusty smell.",
     "The barking still drifted faintly through the door.",
     "\"Rabbits feel braver near a food they know,\" she whispered, opening the carrier door.",
     "\"Now we sit on the floor and do nothing.\"",
     "To Leo, doing nothing sounded lazy, not like real work, but he sat down beside her.",
     "After many quiet minutes, a pink nose appeared in the doorway of the carrier.",
     "Biscuit hopped out, sniffed the hay, and settled beside Leo's knee.",
     "Dr. Ramos gently checked her teeth and ears while Hana smiled with relief."
    ],
    [
     "\"Next Saturday,\" Leo said with a grin, \"I'm bringing a book to read while I wait.\""
    ]
   ],
   "items": [
    {
     "id": "b4-l13-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the story best show?",
     "key": 1,
     "evidence": [
      12,
      14
     ],
     "options": [
      {
       "text": "Sharing a job with family makes the work more fun.",
       "trap": "detail",
       "why": "Leo does help his aunt, but that is one detail. The lesson comes from what happens with Biscuit."
      },
      {
       "text": "Sometimes the best way to help is to hold still and wait."
      },
      {
       "text": "A gentle touch can calm even a very scared animal.",
       "trap": "opposite",
       "why": "When Leo reaches in to pet Biscuit, she presses against the far wall. His touch makes her more scared."
      },
      {
       "text": "Admitting a mistake out loud helps you learn from it.",
       "trap": "not-in-text",
       "why": "Leo feels embarrassed, but he never talks about his mistake. Think about what he learns on the floor."
      }
     ]
    },
    {
     "id": "b4-l13-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "At first, what does Leo think of his aunt's plan in the supply room?",
     "key": 3,
     "evidence": [
      13
     ],
     "options": [
      {
       "text": "He thinks it is a test to see if he follows orders.",
       "trap": "not-in-text",
       "why": "The story never says Leo feels tested. Look at what doing nothing sounds like to him."
      },
      {
       "text": "He thinks it is a trick to help Hana stop worrying.",
       "trap": "word-lift",
       "why": "Hana smiles with relief later, but Leo never thinks the plan is a trick for her."
      },
      {
       "text": "He thinks it is too risky for such a scared rabbit.",
       "trap": "not-in-text",
       "why": "Leo never worries the plan is risky. Find the sentence that tells how doing nothing sounds to him."
      },
      {
       "text": "He thinks it sounds lazy, not like real work."
      }
     ]
    },
    {
     "id": "b4-l13-3",
     "order": 3,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "setting",
     "prompt": "Why does Dr. Ramos choose the supply room for Biscuit?",
     "key": 2,
     "evidence": [
      9,
      11
     ],
     "options": [
      {
       "text": "It has a soft blanket that feels like home.",
       "trap": "not-in-text",
       "why": "The story never mentions a blanket. Think about what fills the air in that room."
      },
      {
       "text": "It is dim and small, like a rabbit's burrow.",
       "trap": "not-in-text",
       "why": "The story never says the room is dim. Think about the smell in the room."
      },
      {
       "text": "It smells of hay, a food that Biscuit knows."
      },
      {
       "text": "It is the one room where no barking can reach.",
       "trap": "opposite",
       "why": "The story says barking still drifts through the door. Look at what Dr. Ramos whispers."
      }
     ]
    },
    {
     "id": "b4-l13-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "Tap the sentence that uses a comparison to show how frightened Biscuit is.",
     "keys": [
      6
     ],
     "why": "Look in the second paragraph, right after Leo reaches into the carrier, for a sentence that compares Biscuit to something."
    },
    {
     "id": "b4-l13-5",
     "order": 5,
     "format": "two-part",
     "area": "literary-key-ideas",
     "skill": "plot",
     "evidence": [
      14
     ],
     "a": {
      "prompt": "Part A: What finally makes Biscuit come out of the carrier?",
      "key": 2,
      "options": [
       {
        "text": "Leo reaches in gently and pets her soft fur.",
        "trap": "opposite",
        "why": "When Leo reaches in, Biscuit thumps her foot and moves away from him."
       },
       {
        "text": "Hana softly calls Biscuit's name from the door.",
        "trap": "not-in-text",
        "why": "The story never says Hana calls Biscuit. Look at what happens in the quiet room."
       },
       {
        "text": "Everyone stays still and quiet for a long time."
       },
       {
        "text": "Dr. Ramos sets a carrot treat on the floor.",
        "trap": "not-in-text",
        "why": "There is no treat in the story. Think about what Leo and his aunt do on the floor."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 1,
      "options": [
       {
        "text": "“\"Biscuit is here for a checkup, but she won't come out,\" Hana said softly.”",
        "trap": "true-but",
        "why": "This tells the problem, not how the problem gets solved."
       },
       {
        "text": "“After many quiet minutes, a pink nose appeared in the doorway of the carrier.”"
       },
       {
        "text": "“Dr. Ramos gently checked her teeth and ears while Hana smiled with relief.”",
        "trap": "true-but",
        "why": "This happens after Biscuit is already out. It does not show why she came out."
       },
       {
        "text": "“Eager to be useful, Leo knelt and reached straight into the carrier to pet her.”",
        "trap": "true-but",
        "why": "This happens, but it shows what scared Biscuit, not what brought her out."
       }
      ]
     }
    }
   ],
   "level": 930
  },
  {
   "id": "b4-l15",
   "type": "literary",
   "genre": "story",
   "title": "A Letter in the Snow",
   "band": "b4",
   "topics": [
    "heart-blood",
    "human-body",
    "science"
   ],
   "paragraphs": [
    [
     "On the morning of the first big snowstorm, I wanted to go sledding with my friends.",
     "Instead, Grandpa Tomás handed me my boots and said we had an appointment at the community center.",
     "I stomped through the drifts behind him, sure this was the most boring errand in the world."
    ],
    [
     "Inside, the gym smelled like coffee and wet coats.",
     "Because of the snow, only three people sat in the long row of chairs.",
     "A nurse named Ms. Okafor said the hospital's supply of blood was running dangerously low that week.",
     "Grandpa rolled up his sleeve as if he did this every day, and he hummed while the bag slowly filled."
    ],
    [
     "I asked him why he would walk through a storm to give away part of himself.",
     "He tapped his chest and smiled.",
     "“My heart pumps this blood around my body all day long, and my body makes more,” he said.",
     "“Every bag I give is a letter to someone I will never meet.”"
    ],
    [
     "Ms. Okafor let me listen through her stethoscope to my own heart.",
     "It thumped fast and steady, like boots marching through snow.",
     "On the walk home, I didn't mind the cold at all.",
     "I counted the years on my fingers until I would be old enough to give a letter of my own."
    ]
   ],
   "items": [
    {
     "id": "b4-l15-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this story show?",
     "key": 2,
     "evidence": [
      10,
      14
     ],
     "options": [
      {
       "text": "Trying something new can be less scary than you expect.",
       "trap": "not-in-text",
       "why": "The narrator was bored, not scared. The story's change is about wanting to help others."
      },
      {
       "text": "Time with family can be better than time with friends.",
       "trap": "not-in-text",
       "why": "The story never compares family and friends. Look at what the narrator wants to do at the end."
      },
      {
       "text": "Helping strangers you will never meet can be worth real effort."
      },
      {
       "text": "Staying calm can help you get through a hard task.",
       "trap": "detail",
       "why": "Grandpa does stay calm, but that is one detail. The whole story shows something bigger."
      }
     ]
    },
    {
     "id": "b4-l15-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "How does Grandpa Tomás feel while the bag fills?",
     "key": 0,
     "evidence": [
      6
     ],
     "options": [
      {
       "text": "He feels relaxed and at ease."
      },
      {
       "text": "He feels tired from the long walk.",
       "trap": "not-in-text",
       "why": "The story never says Grandpa is tired. Check how he acts as he rolls up his sleeve."
      },
      {
       "text": "He feels proud and wants others to notice.",
       "trap": "not-in-text",
       "why": "The story never shows Grandpa wanting attention. Look at what he does in the chair."
      },
      {
       "text": "He feels nervous but tries to hide it.",
       "trap": "opposite",
       "why": "Grandpa acts like he does this every day and even hums. That does not show nerves."
      }
     ]
    },
    {
     "id": "b4-l15-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "At the beginning, why does the narrator think the trip with Grandpa is a bad idea?",
     "key": 1,
     "evidence": [
      0,
      2
     ],
     "options": [
      {
       "text": "It means missing a soccer game with the team.",
       "trap": "not-in-text",
       "why": "The story never mentions soccer. Reread the first sentence to see what the narrator wanted to do."
      },
      {
       "text": "It means missing a morning of sledding with friends."
      },
      {
       "text": "It means missing a birthday party at a friend's house.",
       "trap": "not-in-text",
       "why": "No party is in the story. Look at the first sentence for the narrator's real plan."
      },
      {
       "text": "It means waiting for hours in a crowded room.",
       "trap": "not-in-text",
       "why": "The story never says the narrator worried about waiting. Reread the first sentence."
      }
     ]
    },
    {
     "id": "b4-l15-4",
     "order": 4,
     "format": "two-part",
     "area": "literary-key-ideas",
     "skill": "setting",
     "evidence": [
      4,
      5
     ],
     "a": {
      "prompt": "Part A: Why does the snowstorm matter in this story?",
      "key": 0,
      "options": [
       {
        "text": "It kept most people home, so few were there to give blood."
       },
       {
        "text": "It blocked the roads, so the nurse arrived hours late.",
        "trap": "not-in-text",
        "why": "The story never says the nurse was late. Check how many people sat in the chairs."
       },
       {
        "text": "It caused road accidents, so the hospital needed extra blood.",
        "trap": "not-in-text",
        "why": "The story never mentions accidents. Look at who came to the gym that day."
       },
       {
        "text": "It closed the schools, so the narrator was free to come along.",
        "trap": "not-in-text",
        "why": "The story never mentions school. Look at what the snow did to the group at the gym."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which sentence from the passage best supports your answer to Part A?",
      "key": 3,
      "options": [
       {
        "text": "“On the walk home, I didn't mind the cold at all.”",
        "trap": "true-but",
        "why": "That shows how the narrator changed, not what the snow did to the blood drive."
       },
       {
        "text": "“I stomped through the drifts behind him, sure this was the most boring errand in the world.”",
        "trap": "true-but",
        "why": "That shows the narrator's mood, not why the storm mattered at the blood drive."
       },
       {
        "text": "“Inside, the gym smelled like coffee and wet coats.”",
        "trap": "true-but",
        "why": "That sentence describes the gym, but it does not show how the snow changed who came."
       },
       {
        "text": "“Because of the snow, only three people sat in the long row of chairs.”"
       }
      ]
     }
    },
    {
     "id": "b4-l15-5",
     "order": 5,
     "format": "sentence",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "Tap the sentence where Grandpa compares the blood he gives to something else to show what it means to other people.",
     "keys": [
      10
     ],
     "why": "Look at what Grandpa says after he tells how his heart pumps blood."
    }
   ],
   "level": 830
  },
  {
   "id": "b4-l16",
   "type": "literary",
   "genre": "fable",
   "title": "Hector and the Soft Landing",
   "band": "b4",
   "topics": [
    "monster-trucks",
    "cars",
    "vehicles-engineering"
   ],
   "paragraphs": [
    [
     "Hector the monster truck sat stuck in the mud, his giant tires spinning.",
     "The packed stands had gone silent, and the only sound was a sticky slurp."
    ],
    [
     "That morning, he had rolled into the arena feeling taller than the scoreboard.",
     "Mabel, the old tractor who smoothed the track each night, was waiting by the ramp.",
     "“Last night’s rain soaked the landing,” she said.",
     "“Take the jump slowly today, or the soft dirt will swallow your wheels.”",
     "Hector revved his engine so loudly that her warning disappeared in the noise.",
     "“The fans did not come to see me crawl,” he answered.",
     "All he could think about was making the crowd roar louder than ever."
    ],
    [
     "When the gates opened, Hector raced toward the ramp at full speed.",
     "He soared through the air, and for one bright second the crowd leaped to its feet.",
     "Then he landed with a heavy splat, and his front end sank to the bumpers."
    ],
    [
     "Now, as Hector’s wheels spun, Mabel chugged slowly across the arena.",
     "She hooked a chain to Hector’s bumper and pulled him free with slow, steady strength.",
     "The crowd cheered, but this time the cheers were for the little tractor."
    ],
    [
     "The next weekend, Hector stopped beside Mabel before the show began.",
     "“How does the dirt look today?” he asked, and this time he kept his engine quiet.",
     "She told him the left side was firm, so he jumped there and landed cleanly."
    ]
   ],
   "items": [
    {
     "id": "b4-l16-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does the story show?",
     "key": 1,
     "evidence": [
      16,
      17
     ],
     "options": [
      {
       "text": "Helping someone in need can earn you the respect of others.",
       "trap": "true-but",
       "why": "The crowd does cheer for Mabel, but the story is mostly about how Hector changes."
      },
      {
       "text": "Listening to someone who knows more can keep you out of trouble."
      },
      {
       "text": "Big dreams can take many tries before they finally come true.",
       "trap": "not-in-text",
       "why": "Hector does not keep trying the same dream. Look at what he asks Mabel the next weekend."
      },
      {
       "text": "Being small can be a strength that others fail to notice.",
       "trap": "detail",
       "why": "Mabel is strong, but that is one part. Look at what Hector does differently at the end."
      }
     ]
    },
    {
     "id": "b4-l16-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "How is the story organized?",
     "key": 3,
     "evidence": [
      0,
      2
     ],
     "options": [
      {
       "text": "It tells about three shows, and each jump is bigger than the one before.",
       "trap": "not-in-text",
       "why": "There are only two shows, and the second jump is more careful, not bigger."
      },
      {
       "text": "It switches back and forth between what Hector and Mabel are thinking.",
       "trap": "not-in-text",
       "why": "The story never tells Mabel's thoughts. Check where the story begins and where it goes next."
      },
      {
       "text": "It follows one day in order, from the early morning to the final night.",
       "trap": "opposite",
       "why": "The story does not start in the morning. Look at what is happening in the very first paragraph."
      },
      {
       "text": "It opens at the worst moment, then goes back to show how it happened."
      }
     ]
    },
    {
     "id": "b4-l16-3",
     "order": 3,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Why does Hector keep his engine quiet the next weekend?",
     "key": 0,
     "evidence": [
      6,
      16
     ],
     "options": [
      {
       "text": "He wants to hear every word of the answer he gets."
      },
      {
       "text": "He wants to keep the crowd from noticing him ask for help.",
       "trap": "not-in-text",
       "why": "The story never says he is hiding from the crowd. Look at what his loud engine did in the second paragraph."
      },
      {
       "text": "He wants to save his engine's power for the big jump.",
       "trap": "not-in-text",
       "why": "The story never talks about saving power. Think about what happened the last time his engine was loud."
      },
      {
       "text": "He wants to keep from shaking the soft dirt near the ramp.",
       "trap": "word-lift",
       "why": "The words soft dirt are in the story, but not as his reason. Think about what his noise covered up before."
      }
     ]
    },
    {
     "id": "b4-l16-4",
     "order": 4,
     "format": "multi",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "How do Hector and Mabel see the jump differently before the show? Pick two.",
     "keys": [
      1,
      4
     ],
     "evidence": [
      5,
      8
     ],
     "options": [
      {
       "text": "Hector sees it as easy because the track looks dry.",
       "trap": "not-in-text",
       "why": "Hector never says the track looks dry. Look at what he says about the fans."
      },
      {
       "text": "Mabel sees it as a risk because the ground is soft."
      },
      {
       "text": "Hector sees it as a way to prove he is better than Mabel.",
       "trap": "not-in-text",
       "why": "Hector never compares himself to Mabel. He talks about the fans instead."
      },
      {
       "text": "Mabel sees it as a chance to show off her own strength.",
       "trap": "not-in-text",
       "why": "Mabel only warns Hector to go slowly. She never talks about showing off."
      },
      {
       "text": "Hector sees it as a chance to make the crowd roar."
      }
     ]
    },
    {
     "id": "b4-l16-5",
     "order": 5,
     "format": "order",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Put these events in the order they happened.",
     "why": "The story starts in the middle. Use time words like \"That morning,\" \"Now,\" and \"The next weekend\" to find the real order.",
     "steps": [
      "Mabel warns Hector that the landing is soaked.",
      "Hector's front end sinks into the mud.",
      "Mabel pulls Hector out with a chain.",
      "Hector asks Mabel how the dirt looks."
     ]
    }
   ],
   "level": 860
  },
  {
   "id": "b4-l17",
   "type": "literary",
   "genre": "story",
   "title": "The Baker's Hands",
   "band": "b4",
   "topics": [
    "acting",
    "theater-dance",
    "arts-entertainment"
   ],
   "paragraphs": [
    [
     "My brother Theo had won the part of Mr. Pettibone, the old baker in our class play.",
     "Every evening he stomped around our kitchen, shouting his lines in a deep, rumbling voice.",
     "“Fresh bread for sale!” he bellowed, waving a wooden spoon like a flag.",
     "At rehearsal, Ms. Alvarez folded her arms and said, “I don't believe you yet, Theo.”"
    ],
    [
     "Theo came home grumpy, flopped onto the couch, and groaned, “Maybe I need to be even louder.”",
     "I had no idea how to help, so I suggested a walk to Mrs. Nakamura's bakery."
    ],
    [
     "Mrs. Nakamura barely raised her voice the whole time we were there.",
     "She hummed as she brushed flour from her apron, and she pressed each loaf gently to test it.",
     "When a little girl dropped her coins, Mrs. Nakamura bent down slowly, one hand resting on her back.",
     "I glanced at Theo, expecting him to grab the biggest roll.",
     "Instead, he was watching her hands as closely as if they were a magic trick."
    ],
    [
     "That night our kitchen was quiet for once.",
     "Theo patted an invisible loaf and rubbed his back as though it ached.",
     "He spoke his lines softly, like an old man greeting a neighbor he had known forever."
    ],
    [
     "At the next rehearsal, nobody bellowed during the bakery scene.",
     "Ms. Alvarez unfolded her arms, and a slow smile spread across her face.",
     "“Now I believe you,” she said."
    ]
   ],
   "items": [
    {
     "id": "b4-l17-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "What lesson does the story show?",
     "key": 3,
     "evidence": [
      10,
      12,
      16
     ],
     "options": [
      {
       "text": "Following a director's advice closely can help an actor play a part well.",
       "trap": "not-in-text",
       "why": "Ms. Alvarez only said she didn't believe him. She never told him what to change."
      },
      {
       "text": "Practicing hard every night can help an actor play a part well.",
       "trap": "opposite",
       "why": "Theo practiced loudly every evening, and it did not work. Something else changed his acting."
      },
      {
       "text": "Using the right props can help an actor play a part well.",
       "trap": "word-lift",
       "why": "Theo waved a spoon at first, but that did not work. Think about what he did at the bakery."
      },
      {
       "text": "Watching how real people behave can help an actor play a part well."
      }
     ]
    },
    {
     "id": "b4-l17-2",
     "order": 2,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "plot",
     "prompt": "Why did Theo change the way he practiced his lines?",
     "key": 3,
     "evidence": [
      6,
      10,
      13
     ],
     "options": [
      {
       "text": "He decided he needed to be even louder to play the baker.",
       "trap": "opposite",
       "why": "Theo said that before the bakery visit. Afterward, he spoke his lines softly instead."
      },
      {
       "text": "His family asked him to stop being so noisy in the kitchen.",
       "trap": "word-lift",
       "why": "The kitchen did get quiet, but nobody asked him to stop. Think about what he watched first."
      },
      {
       "text": "Ms. Alvarez showed him how an old baker should talk and move.",
       "trap": "not-in-text",
       "why": "Ms. Alvarez only said she didn't believe him. Look at what Theo saw at the bakery."
      },
      {
       "text": "He saw how gently and quietly Mrs. Nakamura worked in her bakery."
      }
     ]
    },
    {
     "id": "b4-l17-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "How does the ending of the story connect to the beginning?",
     "key": 3,
     "evidence": [
      3,
      15
     ],
     "options": [
      {
       "text": "Mrs. Nakamura appears at the start and again at the end, showing she came to cheer Theo on.",
       "trap": "not-in-text",
       "why": "Mrs. Nakamura is only in the middle of the story. Check who is at the first and last rehearsals."
      },
      {
       "text": "Theo bellows his line at the start and bellows it again at the end, showing his loud voice finally works.",
       "trap": "opposite",
       "why": "At the end, nobody bellows during the bakery scene. Theo speaks softly instead."
      },
      {
       "text": "Theo waves a wooden spoon at the start and again at the end, showing he has found the perfect prop.",
       "trap": "not-in-text",
       "why": "The spoon shows up only at the start. Look at what Ms. Alvarez does at the start and the end."
      },
      {
       "text": "Ms. Alvarez folds her arms at the start and unfolds them at the end, showing Theo has won her over."
      }
     ]
    },
    {
     "id": "b4-l17-4",
     "order": 4,
     "format": "sentence",
     "area": "literary-key-ideas",
     "skill": "character",
     "prompt": "Tap the sentence that shows Theo paying very close attention to Mrs. Nakamura.",
     "keys": [
      10
     ],
     "why": "Look in the bakery part of the story, right after the narrator glances at Theo."
    },
    {
     "id": "b4-l17-5",
     "order": 5,
     "format": "multi",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "Pick two sentences that are true about who tells this story.",
     "keys": [
      1,
      2
     ],
     "evidence": [
      0,
      9,
      10
     ],
     "options": [
      {
       "text": "A narrator outside the story knows every character's thoughts.",
       "trap": "opposite",
       "why": "The narrator is in the story and even guesses wrong about what Theo will do at the bakery."
      },
      {
       "text": "The narrator tells what Theo does but not what he is thinking."
      },
      {
       "text": "The narrator is a member of Theo's family who uses the word \"I.\""
      },
      {
       "text": "Theo tells the story himself, using the words \"I\" and \"my.\"",
       "trap": "opposite",
       "why": "The narrator says \"My brother Theo,\" so someone else is telling about Theo."
      },
      {
       "text": "Ms. Alvarez tells the story while she watches the rehearsals.",
       "trap": "not-in-text",
       "why": "Ms. Alvarez is talked about, but she is not the one telling it. Check the first sentence."
      }
     ]
    }
   ],
   "level": 900
  },
  {
   "id": "b4-l18",
   "type": "literary",
   "genre": "poem",
   "title": "The White Face",
   "band": "b4",
   "topics": [
    "rubiks-cube",
    "puzzles",
    "games-hobbies"
   ],
   "paragraphs": [
    [
     "For three long afternoons, after homework,",
     "I twisted and rotated the jumbled cube.",
     "At last one face gleamed perfectly white,",
     "as smooth as fresh snow on a silent meadow."
    ],
    [
     "I placed it carefully on my windowsill",
     "and tiptoed past it like a sleeping cat.",
     "The remaining sides were still a storm of colors,",
     "but I refused to wreck that one white face."
    ],
    [
     "Then, examining it closely, I discovered the trouble:",
     "every middle row I wanted to repair",
     "was trapped behind my flawless white.",
     "I held my breath and gave a twist,",
     "and my snowfield shattered into fragments."
    ],
    [
     "But turn by steady turn, like birds at dusk",
     "settling quietly onto their own branches,",
     "the colors drifted home.",
     "Red discovered red, and green located green,",
     "and the white came back to join them."
    ],
    [
     "Tonight I scramble it deliberately,",
     "one reckless twist after another,",
     "and I grin at the tangle in my hands.",
     "Now I understand the path back through it."
    ]
   ],
   "items": [
    {
     "id": "b4-l18-1",
     "order": 1,
     "format": "single",
     "area": "literary-key-ideas",
     "skill": "theme",
     "prompt": "Which lesson does this poem show?",
     "key": 2,
     "evidence": [
      10,
      11,
      15
     ],
     "options": [
      {
       "text": "Asking others for help can make a hard task easier.",
       "trap": "not-in-text",
       "why": "The poem never shows the speaker asking anyone for help."
      },
      {
       "text": "A little practice each day makes a hard puzzle easier.",
       "trap": "detail",
       "why": "The speaker did work for three afternoons, but that is one detail. The big change came from breaking the white face."
      },
      {
       "text": "Sometimes you must undo something good to reach something better."
      },
      {
       "text": "Keeping careful watch over your work protects what you have built.",
       "trap": "opposite",
       "why": "Guarding the white face kept the speaker stuck. Things got better only after the white face was broken."
      }
     ]
    },
    {
     "id": "b4-l18-2",
     "order": 2,
     "format": "single",
     "area": "literary-craft",
     "skill": "structure",
     "prompt": "Stanza 3 is where the poem turns. What does the speaker find out there?",
     "key": 0,
     "evidence": [
      8,
      9,
      10
     ],
     "options": [
      {
       "text": "The finished side is in the way of fixing the other rows."
      },
      {
       "text": "The finished side has one square of the wrong color.",
       "trap": "opposite",
       "why": "The poem calls the white side \"flawless,\" so it had no wrong squares."
      },
      {
       "text": "One piece has been stuck in the wrong spot all along.",
       "trap": "word-lift",
       "why": "The poem says the rows were \"trapped,\" but it means blocked by the white side, not stuck pieces."
      },
      {
       "text": "A different side would have been easier to start with.",
       "trap": "not-in-text",
       "why": "The speaker never talks about starting with another side. The trouble is what the white side blocks."
      }
     ]
    },
    {
     "id": "b4-l18-3",
     "order": 3,
     "format": "single",
     "area": "literary-craft",
     "skill": "point-of-view",
     "prompt": "In the last stanza, how does the speaker see the tangled cube?",
     "key": 0,
     "evidence": [
      20,
      21
     ],
     "options": [
      {
       "text": "as a puzzle the speaker knows the way back from"
      },
      {
       "text": "as a puzzle the speaker can solve with eyes closed",
       "trap": "too-broad",
       "why": "The speaker knows the path back, but never says it can be done without looking."
      },
      {
       "text": "as a challenge to beat a faster time than before",
       "trap": "not-in-text",
       "why": "The poem never mentions speed or a timer. Look at the last line of the poem."
      },
      {
       "text": "as a pattern too pretty to undo just yet",
       "trap": "not-in-text",
       "why": "The speaker grins at the tangle because the way back is clear, not to keep the pattern."
      }
     ]
    },
    {
     "id": "b4-l18-4",
     "order": 4,
     "format": "two-part",
     "area": "literary-key-ideas",
     "skill": "character",
     "evidence": [
      5,
      7
     ],
     "a": {
      "prompt": "Part A: Before stanza 3, how does the speaker feel about the finished white face?",
      "key": 1,
      "options": [
       {
        "text": "proud enough to show it to everyone",
        "trap": "not-in-text",
        "why": "The poem never shows the speaker showing the cube to anyone. The speaker just tiptoes past it."
       },
       {
        "text": "unwilling to disturb it at all"
       },
       {
        "text": "eager to build the next side from it",
        "trap": "opposite",
        "why": "The speaker refuses to touch the white face, so no new side gets built from it."
       },
       {
        "text": "let down that the rest was still mixed",
        "trap": "not-in-text",
        "why": "The other sides were still mixed, but the speaker never says feeling let down. Look at how the speaker treats the white face."
       }
      ]
     },
     "b": {
      "prompt": "Part B: Which line from the poem best supports your answer to Part A?",
      "key": 0,
      "options": [
       {
        "text": "“but I refused to wreck that one white face.”"
       },
       {
        "text": "“At last one face gleamed perfectly white,”",
        "trap": "true-but",
        "why": "This line tells that the face was done, but not how the speaker feels about keeping it."
       },
       {
        "text": "“Tonight I scramble it deliberately,”",
        "trap": "true-but",
        "why": "This line comes at the end, after the speaker's feelings have changed."
       },
       {
        "text": "“The remaining sides were still a storm of colors,”",
        "trap": "true-but",
        "why": "This line describes the other sides of the cube, not the speaker's feelings about the white face."
       }
      ]
     }
    },
    {
     "id": "b4-l18-5",
     "order": 5,
     "format": "multi",
     "area": "literary-craft",
     "skill": "figurative-language",
     "prompt": "Read the first three lines of stanza 4. What does the comparison in these lines show? Pick two.",
     "keys": [
      2,
      3
     ],
     "evidence": [
      13,
      14,
      15
     ],
     "options": [
      {
       "text": "The colors scatter in every direction at once.",
       "trap": "opposite",
       "why": "Birds settling on branches are coming to rest. The colors are coming together, not flying apart."
      },
      {
       "text": "The speaker gets the idea by watching birds outside.",
       "trap": "literal",
       "why": "The birds are only a comparison. The speaker is not watching real birds out the window."
      },
      {
       "text": "Each color goes back to the side where it belongs."
      },
      {
       "text": "The fixing happens calmly, one step at a time."
      },
      {
       "text": "The speaker hurries to finish before it gets dark.",
       "trap": "literal",
       "why": "\"Dusk\" is part of the picture of birds. It does not mean the speaker is racing the dark."
      }
     ]
    }
   ],
   "level": 1000
  }
 ],
 "vocab": [
  {
   "id": "b4-v01",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Maya was reluctant to jump into the chilly lake. She stood on the dock for ten minutes, shaking her head.",
   "word": "reluctant",
   "prompt": "What does reluctant mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "too tired",
     "trap": "not-in-text",
     "why": "Nothing says Maya was tired. Shaking her head shows she did not want to jump."
    },
    {
     "text": "eager",
     "trap": "opposite",
     "why": "Maya stood on the dock for ten minutes shaking her head, so she did not want to jump."
    },
    {
     "text": "too cold",
     "trap": "word-lift",
     "why": "The lake is chilly, but reluctant tells how Maya felt about jumping, not how cold she was."
    },
    {
     "text": "not wanting"
    }
   ],
   "order": 1
  },
  {
   "id": "b4-v02",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "The cautious hiker tested each rock with her foot before she stepped on it. She did not want to slip on the wet trail.",
   "word": "cautious",
   "prompt": "What does cautious mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "lost",
     "trap": "not-in-text",
     "why": "The hiker is on the trail, and nothing says she lost her way."
    },
    {
     "text": "slippery",
     "trap": "word-lift",
     "why": "The trail was wet, but cautious describes the hiker, who checked every step so she would not slip."
    },
    {
     "text": "speedy",
     "trap": "opposite",
     "why": "Testing each rock before stepping takes time. She was moving slowly and carefully, not quickly."
    },
    {
     "text": "careful"
    }
   ],
   "order": 2
  },
  {
   "id": "b4-v03",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "After the long car ride, my little brother grew drowsy. His eyes kept closing, and he yawned again and again.",
   "word": "drowsy",
   "prompt": "What does drowsy mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "wide awake",
     "trap": "opposite",
     "why": "Closing eyes and yawning again and again show he was ready for sleep, not wide awake."
    },
    {
     "text": "bored",
     "trap": "not-in-text",
     "why": "Long rides can be dull, but closing eyes and yawning are clues for feeling sleepy."
    },
    {
     "text": "sleepy"
    },
    {
     "text": "carsick",
     "trap": "word-lift",
     "why": "The car ride is mentioned, but nothing says he felt sick. His yawns point to being sleepy."
    }
   ],
   "order": 3
  },
  {
   "id": "b4-v04",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Grandpa misplaced his reading glasses again this morning. We finally found them resting on top of his head.",
   "word": "misplaced",
   "prompt": "The prefix mis- means \"wrongly.\" What does misplaced mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "lost track of"
    },
    {
     "text": "carefully put away",
     "trap": "opposite",
     "why": "Mis- means wrongly, and the family had to search, so the glasses were not put away carefully."
    },
    {
     "text": "broke",
     "trap": "not-in-text",
     "why": "Nothing says the glasses were damaged. The family just had to search to find them."
    },
    {
     "text": "set on his head",
     "trap": "detail",
     "why": "That is where the glasses were, but misplaced means Grandpa forgot where he had put them."
    }
   ],
   "order": 4
  },
  {
   "id": "b4-v05",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "The fearless kitten marched right up to the big dog. Then it calmly sniffed the dog's wet black nose.",
   "word": "fearless",
   "prompt": "The suffix -less means \"without.\" What does fearless mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "tiny",
     "trap": "not-in-text",
     "why": "Kittens are small, but the word parts fear and -less tell about feelings, not size."
    },
    {
     "text": "frightened",
     "trap": "opposite",
     "why": "Fear plus -less means without fear, and the kitten calmly marched up to the dog."
    },
    {
     "text": "brave"
    },
    {
     "text": "curious",
     "trap": "true-but",
     "why": "Sniffing shows the kitten was curious, but fear plus -less means without fear."
    }
   ],
   "order": 5
  },
  {
   "id": "b4-v06",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Before we baked the bread, Dad asked me to preheat the oven. It needed to be hot when the pan went in.",
   "word": "preheat",
   "prompt": "The prefix pre- means \"before.\" What does preheat mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "heat it a second time",
     "trap": "not-in-text",
     "why": "That would be re-, which means again. Pre- means before, so the oven heats before baking."
    },
    {
     "text": "heat it ahead of time"
    },
    {
     "text": "cool it down",
     "trap": "opposite",
     "why": "The oven needed to be hot when the pan went in, so it was warmed, not cooled."
    },
    {
     "text": "bake the bread in it",
     "trap": "true-but",
     "why": "They did bake bread, but preheating happens first, so the oven is hot when the pan goes in."
    }
   ],
   "order": 6
  },
  {
   "id": "b4-v07",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "The bike path climbed a steep grade near the park. We slowed down and pedaled harder to reach the top.",
   "word": "grade",
   "prompt": "What does grade mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "bumpy patch",
     "trap": "not-in-text",
     "why": "Nothing says the path was rough. Climbing to the top shows the grade goes uphill."
    },
    {
     "text": "slope"
    },
    {
     "text": "school mark",
     "trap": "literal",
     "why": "Grade can mean a mark on a test, but here the path climbs, and riders pedal to the top."
    },
    {
     "text": "flat stretch",
     "trap": "opposite",
     "why": "The path climbed and riders had to pedal harder, so the ground was not flat."
    }
   ],
   "order": 7
  },
  {
   "id": "b4-v08",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "The campers hurried to pitch their tent before dark. They hammered in the stakes and pulled the ropes tight.",
   "word": "pitch",
   "prompt": "What does pitch mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "pack away",
     "trap": "opposite",
     "why": "Pulling the ropes tight and hammering stakes are steps for putting a tent up, not taking it down."
    },
    {
     "text": "throw",
     "trap": "literal",
     "why": "Pitch can mean throw a ball, but hammering stakes and tightening ropes shows they were putting up the tent."
    },
    {
     "text": "set up"
    },
    {
     "text": "borrow",
     "trap": "not-in-text",
     "why": "The sentences never say where the tent came from. They describe the campers building it."
    }
   ],
   "order": 8
  },
  {
   "id": "b4-v09",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Apples were abundant at the orchard this fall. Every tree was so full that its branches bent toward the ground.",
   "word": "abundant",
   "prompt": "What does abundant mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "small and sour",
     "trap": "not-in-text",
     "why": "The sentences never say how big the apples were or how they tasted."
    },
    {
     "text": "hard to find",
     "trap": "opposite",
     "why": "The trees were so full that branches bent down, so apples were easy to find."
    },
    {
     "text": "in large supply"
    },
    {
     "text": "bent toward the ground",
     "trap": "word-lift",
     "why": "The branches bent, but abundant describes the apples. Look at why the branches bent."
    }
   ],
   "order": 9
  },
  {
   "id": "b4-v10",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "The apartment next door had been vacant since spring. Nobody lived there, and the windows stayed dark every night.",
   "word": "vacant",
   "prompt": "What does vacant mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "crowded with people",
     "trap": "opposite",
     "why": "The second sentence says nobody lived there, which is the other way around."
    },
    {
     "text": "empty, with no one in it"
    },
    {
     "text": "newly painted",
     "trap": "not-in-text",
     "why": "The sentences say nothing about paint. They tell us that nobody lived there."
    },
    {
     "text": "dark every night",
     "trap": "word-lift",
     "why": "Dark windows are a sign of the clue, but the main clue is that nobody lived there."
    }
   ],
   "order": 10
  },
  {
   "id": "b4-v11",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Leo was frantic when he couldn't find his little sister at the busy park. He ran in circles, shouting her name.",
   "word": "frantic",
   "prompt": "What does frantic mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "wild with worry"
    },
    {
     "text": "out of breath",
     "trap": "true-but",
     "why": "Leo might be out of breath from running, but the word describes his scared, upset feeling."
    },
    {
     "text": "calm and patient",
     "trap": "opposite",
     "why": "Running in circles and shouting shows Leo was not calm at all."
    },
    {
     "text": "busy and crowded",
     "trap": "word-lift",
     "why": "Busy describes the park. Frantic describes how Leo felt when his sister was missing."
    }
   ],
   "order": 11
  },
  {
   "id": "b4-v12",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Unlike the wobbly card table, the oak bench was sturdy enough to hold four grown-ups at once.",
   "word": "sturdy",
   "prompt": "What does sturdy mean in this sentence?",
   "key": 0,
   "options": [
    {
     "text": "strong and steady"
    },
    {
     "text": "long enough for four",
     "trap": "detail",
     "why": "Holding four grown-ups shows how strong the bench is, not just its size."
    },
    {
     "text": "made of wood",
     "trap": "true-but",
     "why": "The bench is oak, but sturdy means it can hold four grown-ups without wobbling."
    },
    {
     "text": "shaky and weak",
     "trap": "opposite",
     "why": "The word unlike tells us the bench is different from the wobbly table."
    }
   ],
   "order": 12
  },
  {
   "id": "b4-v13",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "The hungry puppy would devour its whole bowl of food in seconds. Then it licked the empty dish and begged for more.",
   "word": "devour",
   "prompt": "What does devour mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "eat quickly and completely"
    },
    {
     "text": "sniff at the bowl",
     "trap": "not-in-text",
     "why": "The sentences never mention sniffing. They say the whole bowl was gone in seconds."
    },
    {
     "text": "eat slowly and carefully",
     "trap": "opposite",
     "why": "The puppy finished the whole bowl in seconds, so it did not eat slowly."
    },
    {
     "text": "lick the dish clean",
     "trap": "word-lift",
     "why": "The puppy licked the dish afterward. Devour is what it did to the food first."
    }
   ],
   "order": 13
  },
  {
   "id": "b4-v14",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Mom packs our lunches in reusable bags instead of paper ones that get thrown away.",
   "word": "reusable",
   "prompt": "The prefix re- means \"again,\" and the suffix -able means \"can be.\" What does reusable mean in this sentence?",
   "key": 1,
   "options": [
    {
     "text": "made out of paper",
     "trap": "word-lift",
     "why": "The sentence says the reusable bags are used instead of paper ones."
    },
    {
     "text": "able to be used again"
    },
    {
     "text": "packed with lunch",
     "trap": "detail",
     "why": "The bags hold lunch, but re- and -able tell us they can be used again."
    },
    {
     "text": "used only one time",
     "trap": "opposite",
     "why": "That describes the paper bags that get thrown away, not the reusable ones."
    }
   ],
   "order": 14
  },
  {
   "id": "b4-v15",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "After weeks of practice, Maya's cartwheels looked effortless. She flipped across the grass as easily as walking.",
   "word": "effortless",
   "prompt": "The suffix -less means \"without.\" What does effortless mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "done on the grass",
     "trap": "detail",
     "why": "The grass is where she did cartwheels, not what effortless means."
    },
    {
     "text": "done without hard work"
    },
    {
     "text": "practiced for weeks",
     "trap": "true-but",
     "why": "Maya did practice for weeks, but effortless describes how easy her cartwheels looked."
    },
    {
     "text": "done with great struggle",
     "trap": "opposite",
     "why": "The suffix -less means without, and Maya flipped as easily as walking."
    }
   ],
   "order": 15
  },
  {
   "id": "b4-v16",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "The new student found the school halls unfamiliar, so a classmate showed him where the library was.",
   "word": "unfamiliar",
   "prompt": "The prefix un- means \"not.\" What does unfamiliar mean in this sentence?",
   "key": 2,
   "options": [
    {
     "text": "close to the library",
     "trap": "word-lift",
     "why": "The library is where the classmate led him, not what unfamiliar means."
    },
    {
     "text": "very well known",
     "trap": "opposite",
     "why": "The prefix un- means not, and he needed help finding the library."
    },
    {
     "text": "not known before"
    },
    {
     "text": "long and crowded",
     "trap": "not-in-text",
     "why": "The sentence never says how long or busy the halls were."
    }
   ],
   "order": 16
  },
  {
   "id": "b4-v17",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "Grandpa sat at the stern of the rowboat, steering while we paddled from the front.",
   "word": "stern",
   "prompt": "What does stern mean in this sentence?",
   "key": 2,
   "options": [
    {
     "text": "the front of a boat",
     "trap": "opposite",
     "why": "The others paddled from the front, so Grandpa sat at the other end."
    },
    {
     "text": "a paddle for rowing",
     "trap": "not-in-text",
     "why": "Grandpa sat at the stern, so it is a spot in the boat, not a tool."
    },
    {
     "text": "the back end of a boat"
    },
    {
     "text": "strict and serious",
     "trap": "literal",
     "why": "Stern can mean strict, but here it names a place where Grandpa sat in the boat."
    }
   ],
   "order": 17
  },
  {
   "id": "b4-v18",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "Dad likes to season the soup with a pinch of salt and some pepper before serving it.",
   "word": "season",
   "prompt": "What does season mean in this sentence?",
   "key": 1,
   "options": [
    {
     "text": "heat on the stove",
     "trap": "not-in-text",
     "why": "The sentence never mentions heating. It tells us Dad adds salt and pepper."
    },
    {
     "text": "add flavor to"
    },
    {
     "text": "pour into bowls",
     "trap": "word-lift",
     "why": "Serving comes after. Season is what Dad does with the salt and pepper first."
    },
    {
     "text": "a time of the year",
     "trap": "literal",
     "why": "Season often means a time like winter, but here Dad adds salt and pepper to soup."
    }
   ],
   "order": 18
  },
  {
   "id": "b4-v19",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "During the long, dry summer, fresh water became scarce on our grandparents' small farm. There was barely enough left each day for the thirsty cows and goats.",
   "word": "scarce",
   "prompt": "What does scarce mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "in short supply"
    },
    {
     "text": "in large amounts",
     "trap": "opposite",
     "why": "The clue says there was barely enough water, so there was too little, not a lot."
    },
    {
     "text": "muddy and dirty",
     "trap": "not-in-text",
     "why": "The sentences never say the water was dirty; they say there was barely enough of it."
    },
    {
     "text": "scary or alarming",
     "trap": "word-lift",
     "why": "Scarce looks a bit like scare, but the clue 'barely enough' tells you it is about having too little."
    }
   ],
   "order": 19
  },
  {
   "id": "b4-v20",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Maya hesitated at the edge of the cold pool, stopping for a long moment before she jumped. She wanted to swim but was unsure about the chilly water.",
   "word": "hesitated",
   "prompt": "What does hesitated mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "paused because she was unsure"
    },
    {
     "text": "jumped in right away",
     "trap": "opposite",
     "why": "The clue says she stopped for a long moment before she jumped, so she did not go right away."
    },
    {
     "text": "called out to a friend",
     "trap": "not-in-text",
     "why": "No friend is mentioned; the sentences say she stopped and felt unsure."
    },
    {
     "text": "shivered from the cold",
     "trap": "detail",
     "why": "The water was cold, but the clue 'stopping for a long moment' explains what hesitated means."
    }
   ],
   "order": 20
  },
  {
   "id": "b4-v21",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Ben's desk was so cluttered with papers, pencils, and old snack wrappers that he could not find his homework. He spent the whole evening clearing it off.",
   "word": "cluttered",
   "prompt": "What does cluttered mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "made of old wood",
     "trap": "not-in-text",
     "why": "The sentences never say what the desk was made of; they list the things piled on it."
    },
    {
     "text": "messy and covered with things"
    },
    {
     "text": "neat and empty",
     "trap": "opposite",
     "why": "Ben could not find his homework under all the stuff, so the desk was not neat."
    },
    {
     "text": "covered with papers only",
     "trap": "too-narrow",
     "why": "The desk also had pencils and snack wrappers on it, not just papers."
    }
   ],
   "order": 21
  },
  {
   "id": "b4-v22",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Leo tried to persuade his sister to share her paints by promising to help clean up afterward. After listening carefully to his offer, she finally agreed and handed him the brushes.",
   "word": "persuade",
   "prompt": "What does persuade mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "refuse to share with",
     "trap": "opposite",
     "why": "Leo wanted his sister to share, and she agreed, so this is the reverse of what happened."
    },
    {
     "text": "paint a picture for",
     "trap": "not-in-text",
     "why": "Nobody paints a picture in the sentences; Leo makes an offer so she will agree."
    },
    {
     "text": "help someone clean up",
     "trap": "word-lift",
     "why": "Cleaning up was Leo's promise, but the clue 'she finally agreed' shows what persuade means."
    },
    {
     "text": "convince someone to agree"
    }
   ],
   "order": 22
  },
  {
   "id": "b4-v23",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "After an hour of scrubbing and polishing, the old copper pot was gleaming in the sunlight. It shone so brightly that we could see our faces in it.",
   "word": "gleaming",
   "prompt": "What does gleaming mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "made of copper",
     "trap": "detail",
     "why": "The pot is copper, but the clue 'shone so brightly' explains the word gleaming."
    },
    {
     "text": "dull and dusty",
     "trap": "opposite",
     "why": "The pot was just polished and shone so brightly you could see faces in it."
    },
    {
     "text": "very heavy",
     "trap": "not-in-text",
     "why": "The sentences say nothing about the pot's weight; the clue is that it shone."
    },
    {
     "text": "shining brightly"
    }
   ],
   "order": 23
  },
  {
   "id": "b4-v24",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "After the class finished the big art project, Mr. Ortiz helped everyone wash the tables. By the time the bell rang, the whole art room was spotless again.",
   "word": "spotless",
   "prompt": "The suffix -less means \"without.\" What does spotless mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "quiet and empty",
     "trap": "not-in-text",
     "why": "The sentences are about washing the tables, not about the room being quiet."
    },
    {
     "text": "covered in spots",
     "trap": "opposite",
     "why": "The suffix -less means without, so spotless means without any spots at all."
    },
    {
     "text": "completely clean"
    },
    {
     "text": "full of bright colors",
     "trap": "detail",
     "why": "There was an art project, but the class washed the tables, so the room had no spots left."
    }
   ],
   "order": 24
  },
  {
   "id": "b4-v25",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Before our class trip, the museum guide gave us a preview of the dinosaur exhibit. She showed photos of the huge skeletons we would see later.",
   "word": "preview",
   "prompt": "The prefix pre- means \"before.\" What does preview mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "a look ahead of time"
    },
    {
     "text": "a dinosaur skeleton",
     "trap": "detail",
     "why": "The skeletons were what they would see; the preview was the early look at them."
    },
    {
     "text": "a ticket to get in",
     "trap": "not-in-text",
     "why": "No tickets are mentioned; the guide showed photos before the trip."
    },
    {
     "text": "a look back afterward",
     "trap": "opposite",
     "why": "Pre- means before, and the guide showed photos of skeletons they would see later."
    }
   ],
   "order": 25
  },
  {
   "id": "b4-v26",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Grandpa misjudged how deep the snow was and stepped right into a drift up to his knees. He had thought it was only an inch or two deep.",
   "word": "misjudged",
   "prompt": "The prefix mis- means \"wrongly.\" What does misjudged mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "guessed wrongly"
    },
    {
     "text": "shoveled away",
     "trap": "not-in-text",
     "why": "Nobody shovels in the sentences; Grandpa made a wrong guess about the snow."
    },
    {
     "text": "measured exactly",
     "trap": "opposite",
     "why": "Grandpa thought the snow was an inch deep, but it reached his knees, so he was wrong."
    },
    {
     "text": "stepped into",
     "trap": "word-lift",
     "why": "Grandpa did step into the drift, but that happened because he guessed the depth wrongly."
    }
   ],
   "order": 26
  },
  {
   "id": "b4-v27",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "Every spring our old husky starts to shed her thick, fluffy winter coat all over the house. Clumps of soft gray fur pile up on the rug faster than we can sweep.",
   "word": "shed",
   "prompt": "What does shed mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "brush and comb",
     "trap": "not-in-text",
     "why": "No one brushes the dog in the sentences; the fur falls off by itself."
    },
    {
     "text": "let fall off"
    },
    {
     "text": "a small storage building",
     "trap": "literal",
     "why": "A shed can be a building, but here the husky loses fur that piles up on the rug."
    },
    {
     "text": "grow thicker",
     "trap": "opposite",
     "why": "The fur is coming off and piling on the rug, so the coat is not growing."
    }
   ],
   "order": 27
  },
  {
   "id": "b4-v28",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "When the screen door slammed, the startled rabbit bolted across the yard and under the fence. In two seconds it had disappeared into the tall grass.",
   "word": "bolted",
   "prompt": "What does bolted mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "dug a hole",
     "trap": "not-in-text",
     "why": "The rabbit went under the fence, but nothing says it dug; it raced across the yard."
    },
    {
     "text": "crept slowly",
     "trap": "opposite",
     "why": "The rabbit was gone in two seconds, so it moved fast, not slowly."
    },
    {
     "text": "ran away suddenly"
    },
    {
     "text": "locked with a bar",
     "trap": "literal",
     "why": "A bolt can lock a door, but here the rabbit crosses the whole yard in two seconds."
    }
   ],
   "order": 28
  },
  {
   "id": "b4-v29",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "After three weeks without a single drop of rain, the garden soil was completely parched. The tomato plants drooped, and the hard ground cracked into dry, dusty pieces.",
   "word": "parched",
   "prompt": "What does parched mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "full of tomato plants",
     "trap": "word-lift",
     "why": "Tomato plants are in the garden, but the clues about no rain and cracked ground describe how the soil felt."
    },
    {
     "text": "soaked with rainwater",
     "trap": "opposite",
     "why": "There was no rain for three weeks, and the ground cracked into dry pieces, so the soil was not wet."
    },
    {
     "text": "covered in thick weeds",
     "trap": "not-in-text",
     "why": "The sentences never mention weeds. Look at the clues about no rain and dry, dusty ground."
    },
    {
     "text": "very dry from no water"
    }
   ],
   "order": 29
  },
  {
   "id": "b4-v30",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "The nimble goat leaped from rock to rock without ever slipping. It moved so quickly and lightly that the hikers could hardly follow it with their eyes.",
   "word": "nimble",
   "prompt": "What does nimble mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "quick and light on its feet"
    },
    {
     "text": "tall with long horns",
     "trap": "not-in-text",
     "why": "The sentences do not describe the goat's size or horns, only the way it moved."
    },
    {
     "text": "afraid of the hikers",
     "trap": "not-in-text",
     "why": "Nothing says the goat was scared. The clues tell how quickly and lightly it moved."
    },
    {
     "text": "slow and clumsy",
     "trap": "opposite",
     "why": "The goat never slipped and moved quickly and lightly, so it was not slow or clumsy."
    }
   ],
   "order": 30
  },
  {
   "id": "b4-v31",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Maya could not see the fish in the pond because the water was so murky. Mud from the storm had turned it a cloudy brown color.",
   "word": "murky",
   "prompt": "What does murky mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "dark and hard to see through"
    },
    {
     "text": "clear and sparkling",
     "trap": "opposite",
     "why": "Maya could not see the fish, and the water was cloudy brown, so it was not clear."
    },
    {
     "text": "full of hungry fish",
     "trap": "word-lift",
     "why": "Fish are mentioned, but the clue is that Maya could not see them through the cloudy water."
    },
    {
     "text": "cold and icy from the storm",
     "trap": "not-in-text",
     "why": "The storm brought mud, not ice. The clue is the cloudy brown color of the water."
    }
   ],
   "order": 31
  },
  {
   "id": "b4-v32",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Sorting the hundreds of loose buttons by color was a tedious job. After an hour, Leo was yawning and wishing for something more exciting to do.",
   "word": "tedious",
   "prompt": "What does tedious mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "colorful and bright",
     "trap": "word-lift",
     "why": "The buttons were sorted by color, but yawning after an hour shows how the job felt to Leo."
    },
    {
     "text": "long and boring"
    },
    {
     "text": "done with a sewing machine",
     "trap": "not-in-text",
     "why": "No sewing machine is mentioned. Leo's yawning is the clue to what kind of job it was."
    },
    {
     "text": "fun and exciting",
     "trap": "opposite",
     "why": "Leo was yawning and wished for something more exciting, so the job was not fun."
    }
   ],
   "order": 32
  },
  {
   "id": "b4-v33",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "The kitten was hiding under the porch, so Grandpa tried to coax it out. He set down a dish of milk and spoke in a soft, gentle voice.",
   "word": "coax",
   "prompt": "What does coax mean in these sentences?",
   "key": 3,
   "options": [
    {
     "text": "give it a dish of milk",
     "trap": "detail",
     "why": "The milk was one way Grandpa tried, but coax means the whole gentle effort to get the kitten out."
    },
    {
     "text": "take a picture of it",
     "trap": "not-in-text",
     "why": "There is no camera in the sentences. Grandpa was trying to get the kitten to come out."
    },
    {
     "text": "force it out roughly",
     "trap": "opposite",
     "why": "Grandpa used a soft, gentle voice and offered milk, so he was not being rough."
    },
    {
     "text": "gently get it to come"
    }
   ],
   "order": 33
  },
  {
   "id": "b4-v34",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Before we could fly the kite, we had to untangle the long string. It had twisted into a messy knot while it sat inside the closet.",
   "word": "untangle",
   "prompt": "The prefix un- can mean \"to undo.\" What does untangle mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "to cut into short pieces",
     "trap": "not-in-text",
     "why": "Nobody cuts the string. They need the long string to fly the kite, so they undo the knot."
    },
    {
     "text": "to twist into a knot",
     "trap": "opposite",
     "why": "The string was already knotted. Un- means to undo, so untangle means to take the knots out."
    },
    {
     "text": "to undo the knots in"
    },
    {
     "text": "to put away in a closet",
     "trap": "word-lift",
     "why": "The closet is where the string sat, but un- tells us the word means undoing the tangle."
    }
   ],
   "order": 34
  },
  {
   "id": "b4-v35",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "Jada raced all the way up the steep hill to catch the bus. By the time she reached the top, she was breathless and had to rest.",
   "word": "breathless",
   "prompt": "The suffix -less means \"without.\" What does breathless mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "sweating from the hot sun",
     "trap": "not-in-text",
     "why": "The sentences never mention the sun or heat. Think about breath plus -less, meaning without."
    },
    {
     "text": "almost out of breath"
    },
    {
     "text": "running up a steep hill",
     "trap": "detail",
     "why": "Running up the hill is why she felt this way, but breathless tells how she felt at the top."
    },
    {
     "text": "breathing slowly and calmly",
     "trap": "opposite",
     "why": "Jada raced up a steep hill and needed rest, so she was not calm. The -less means without breath."
    }
   ],
   "order": 35
  },
  {
   "id": "b4-v36",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "word-parts",
   "context": "The lifeguard stayed watchful all afternoon, scanning the pool for any swimmer who needed help. She never once looked away from the water.",
   "word": "watchful",
   "prompt": "The suffix -ful means \"full of.\" What does watchful mean in these sentences?",
   "key": 1,
   "options": [
    {
     "text": "sleepy and not paying attention",
     "trap": "opposite",
     "why": "She never looked away from the water, so she was paying close attention, not drifting off."
    },
    {
     "text": "carefully paying attention"
    },
    {
     "text": "good at swimming fast",
     "trap": "not-in-text",
     "why": "The sentences do not say how she swims. They tell how closely she kept looking at the pool."
    },
    {
     "text": "wearing a watch on her wrist",
     "trap": "literal",
     "why": "Here watch means to look closely. The lifeguard kept her eyes on the pool all afternoon."
    }
   ],
   "order": 36
  },
  {
   "id": "b4-v37",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "Mom stuffed a rolled towel along the bottom of the door. A cold draft had been sneaking in underneath and chilling the whole kitchen.",
   "word": "draft",
   "prompt": "What does draft mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "a rolled-up kitchen towel",
     "trap": "detail",
     "why": "The towel is what Mom used to stop the draft, not the draft itself."
    },
    {
     "text": "a warm breeze from the oven",
     "trap": "opposite",
     "why": "The draft was cold and chilled the kitchen, so it was not warm."
    },
    {
     "text": "a stream of moving air"
    },
    {
     "text": "a first try at writing",
     "trap": "literal",
     "why": "That is another meaning of draft. Here something cold sneaks under the door and chills the kitchen."
    }
   ],
   "order": 37
  },
  {
   "id": "b4-v38",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "multiple-meaning",
   "context": "From the top of the bluff, we could see the whole river winding through the valley below. The steep edge dropped straight down to the water.",
   "word": "bluff",
   "prompt": "What does bluff mean in these sentences?",
   "key": 0,
   "options": [
    {
     "text": "a high, steep bank"
    },
    {
     "text": "a wide, flat field",
     "trap": "opposite",
     "why": "The bluff has a steep edge that drops straight down, so it is not flat."
    },
    {
     "text": "a small boat on the river",
     "trap": "not-in-text",
     "why": "No boat is mentioned. The bluff has a steep edge that drops straight down to the river."
    },
    {
     "text": "a trick to fool someone",
     "trap": "literal",
     "why": "That is another meaning of bluff. Here people stand on top of it, and its edge drops to the water."
    }
   ],
   "order": 38
  },
  {
   "id": "b4-v39",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "Maya stared at the strange math puzzle for ten long minutes. She was completely baffled and had no idea where to even begin.",
   "word": "baffled",
   "prompt": "What does baffled mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "tired from staring so long",
     "trap": "detail",
     "why": "She stared for ten minutes, but the clue is that she had no idea where to begin."
    },
    {
     "text": "pleased with how fast she was",
     "trap": "opposite",
     "why": "She had no idea where to begin, so she was not working fast or feeling pleased."
    },
    {
     "text": "confused and unsure what to do"
    },
    {
     "text": "upset with her math teacher",
     "trap": "not-in-text",
     "why": "The sentences never mention a teacher. They show Maya could not understand the puzzle."
    }
   ],
   "order": 39
  },
  {
   "id": "b4-v40",
   "band": "b4",
   "format": "vocab",
   "area": "vocabulary",
   "skill": "context-clues",
   "context": "After the big lunch, the puppy felt sluggish. Instead of chasing his ball, he moved slowly across the rug and flopped down.",
   "word": "sluggish",
   "prompt": "What does sluggish mean in these sentences?",
   "key": 2,
   "options": [
    {
     "text": "playful and full of energy",
     "trap": "opposite",
     "why": "The puppy skipped chasing the ball and moved slowly, so he was not full of energy."
    },
    {
     "text": "still hungry for more food",
     "trap": "not-in-text",
     "why": "He just had a big lunch, and nothing says he wanted more. Look at how he moved."
    },
    {
     "text": "slow and low on energy"
    },
    {
     "text": "soft and fuzzy like a rug",
     "trap": "word-lift",
     "why": "The rug is where he lay down. The clue is that he moved slowly instead of playing."
    }
   ],
   "order": 40
  }
 ],
 "examples": {
  "single": {
   "lead": "Find the answer in the text.",
   "text": [
    "Rosa set her alarm for 5:30. She packed her bag the night before and laid her running shoes by the door."
   ],
   "prompt": "Why did Rosa get ready the night before?",
   "answer": "So she could leave quickly in the morning",
   "steps": [
    "The question asks why.",
    "Back in the text, every step is about being ready early: alarm, bag, shoes.",
    "“She likes running” might be true, but it doesn't answer why."
   ]
  },
  "vocab": {
   "lead": "The words around it are your clues.",
   "text": [
    "The puppy was so timid that it hid under the bed whenever a visitor came in."
   ],
   "prompt": "What does timid mean?",
   "answer": "Shy and easily scared",
   "steps": [
    "Find the clue: it hid whenever a visitor came in.",
    "Hiding from visitors is what a shy, scared animal does.",
    "Check: “The puppy was so shy and scared that it hid.” It makes sense."
   ]
  },
  "sentence": {
   "lead": "Tap the sentence in the passage that proves it.",
   "text": [
    "The library opened at nine.",
    "By 9:05, every computer was taken.",
    "Kids who came later had to wait."
   ],
   "prompt": "Tap the sentence that shows the computers were popular.",
   "answer": "“By 9:05, every computer was taken.”",
   "steps": [
    "Read the question: popular means lots of people wanted them.",
    "Look for the proof, not just a sentence that mentions computers.",
    "Every computer gone in five minutes is the proof."
   ]
  },
  "multi": {
   "lead": "Two answers are right. Pick both.",
   "text": [
    "Bees carry pollen from flower to flower, which helps plants make seeds. They also make honey that people and animals eat."
   ],
   "prompt": "Pick two ways bees help, based on the text.",
   "answer": "They help plants make seeds. They make honey that others eat.",
   "steps": [
    "Read every choice before you pick.",
    "Check each one against the text.",
    "Pick exactly two, then check both again."
   ]
  },
  "two-part": {
   "lead": "Part B asks for the proof of your answer to Part A.",
   "text": [
    "Mia looked at the gray sky, grabbed her umbrella, and then went back for her rain boots too."
   ],
   "prompt": "Part A: What does Mia think will happen? Part B: Which words show it?",
   "answer": "Part A: It will rain. Part B: “grabbed her umbrella” and “went back for her rain boots.”",
   "steps": [
    "Answer Part A from the clues.",
    "For Part B, find the words that made you think so.",
    "If no sentence backs up your Part A, change Part A."
   ]
  },
  "order": {
   "lead": "Use the arrows to put them in order.",
   "text": [
    "After school, Jay fed the dog. Before that, he had finished his homework on the bus. Last of all, he called his grandma."
   ],
   "prompt": "Put Jay's afternoon in order.",
   "answer": "Homework on the bus, then fed the dog, then called his grandma.",
   "steps": [
    "The order in the text isn't always the order things happened.",
    "Look for time words: before that, after, last of all.",
    "Check your order against each time word."
   ]
  }
 }
};

if (typeof module !== "undefined" && module.exports) module.exports = READING_BANK;

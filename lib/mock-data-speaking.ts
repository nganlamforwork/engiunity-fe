import { GradingResult, Question, Session } from "@/types/Speaking";

export function generateMockQuestions(topic: string): Session["questions"] {
  // Generate Part 1 questions (simple, everyday questions)
  const part1: Question[] = [
    {
      id: "part1-1",
      text: `Do you enjoy ${topic.toLowerCase()}?`,
      subQuestions: [
        `How often do you engage with ${topic.toLowerCase()}?`,
        `When did you first become interested in ${topic.toLowerCase()}?`,
      ],
    },
    {
      id: "part1-2",
      text: `Is ${topic.toLowerCase()} popular in your country?`,
      subQuestions: [
        `Why do you think ${topic.toLowerCase()} is important to people?`,
        `Has ${topic.toLowerCase()} changed much in recent years?`,
      ],
    },
    {
      id: "part1-3",
      text: `Do you think ${topic.toLowerCase()} will be more important in the future?`,
      subQuestions: [
        `How might ${topic.toLowerCase()} change in the next few years?`,
        `Would you like to learn more about ${topic.toLowerCase()}?`,
      ],
    },
  ];

  // Generate Part 2 questions (longer, more complex prompts)
  const part2: Question[] = [
    {
      id: "part2-1",
      text: `Describe an experience related to ${topic.toLowerCase()} that had a significant impact on you.`,
      cueCard: [
        "What the experience was",
        "When and where it happened",
        "Who was involved",
        "Why it had such an impact on you",
      ],
    },
  ];

  // Generate Part 3 questions (deeper discussion questions)
  const part3: Question[] = [
    {
      id: "part3-1",
      text: `How has ${topic.toLowerCase()} evolved over the past decade?`,
      subQuestions: [
        `What are the main factors driving changes in ${topic.toLowerCase()}?`,
        `Do you think these changes are generally positive or negative?`,
      ],
      followUp: [
        `How might technological advancements affect ${topic.toLowerCase()} in the future?`,
        `Are there cultural differences in how people approach ${topic.toLowerCase()}?`,
      ],
    },
    {
      id: "part3-2",
      text: `What role should governments play in regulating aspects of ${topic.toLowerCase()}?`,
      subQuestions: [
        `Are there ethical considerations related to ${topic.toLowerCase()} that need to be addressed?`,
        `How can we balance individual freedom with societal needs in this area?`,
      ],
      followUp: [
        `Should international organizations have more influence over ${topic.toLowerCase()}?`,
        `How might economic factors influence policies related to ${topic.toLowerCase()}?`,
      ],
    },
    {
      id: "part3-3",
      text: `In what ways does ${topic.toLowerCase()} affect different generations differently?`,
      subQuestions: [
        `Why might younger people have different perspectives on ${topic.toLowerCase()} compared to older generations?`,
        `How might education systems adapt to address changes in ${topic.toLowerCase()}?`,
      ],
      followUp: [
        `Do you think there will be more or less emphasis on ${topic.toLowerCase()} in the future?`,
        `How can we bridge generational gaps in understanding ${topic.toLowerCase()}?`,
      ],
    },
  ];

  return {
    part1,
    part2,
    part3,
  };
}

export function mockGradeSubmission(
  session: Session,
  answers: Record<string, string>
): GradingResult {
  // This function simulates AI grading of the submission
  // In a real application, this would be handled by an AI model

  // Generate random scores between 5.0 and 8.5
  const getRandomScore = () => 5 + Math.random() * 3.5;

  const ideaScore = getRandomScore();
  const vocabScore = getRandomScore();
  const grammarScore = getRandomScore();
  const coherenceScore = getRandomScore();

  // Generate sample answers for each question
  const sampleAnswers: Record<string, string> = {};
  const keyVocabulary: Record<string, string[]> = {};

  // Part 1 sample answers
  session.questions.part1.forEach((question, index) => {
    const questionId = `part1-${index}`;
    sampleAnswers[questionId] = generateSampleAnswer(session.topic, "part1");
    keyVocabulary[questionId] = generateKeyVocabulary(session.topic, "part1");
  });

  // Part 2 sample answers
  session.questions.part2.forEach((question, index) => {
    const questionId = `part2-${index}`;
    sampleAnswers[questionId] = generateSampleAnswer(session.topic, "part2");
    keyVocabulary[questionId] = generateKeyVocabulary(session.topic, "part2");
  });

  // Part 3 sample answers
  session.questions.part3.forEach((question, index) => {
    const questionId = `part3-${index}`;
    sampleAnswers[questionId] = generateSampleAnswer(session.topic, "part3");
    keyVocabulary[questionId] = generateKeyVocabulary(session.topic, "part3");
  });

  return {
    ideaDevelopment: {
      score: ideaScore,
      feedback: `Your ideas on ${session.topic} show good potential but could be developed more thoroughly. You've presented some interesting perspectives, but more specific examples would strengthen your responses.`,
      strengths: [
        "Good initial understanding of the topic",
        "Some interesting personal perspectives",
        "Attempts to address different aspects of the questions",
      ],
      improvements: [
        "Develop ideas with more specific examples",
        "Consider different perspectives on the topic",
        "Elaborate more on your main points",
      ],
    },
    vocabulary: {
      score: vocabScore,
      feedback: `You've used a reasonable range of vocabulary related to ${session.topic}. There's room to incorporate more advanced lexical items and topic-specific terminology to enhance precision.`,
      strengths: [
        "Appropriate everyday vocabulary",
        "Some good descriptive language",
        "Generally clear expression of ideas",
      ],
      improvements: [
        "Incorporate more advanced vocabulary",
        "Use more precise topic-specific terminology",
        "Expand range of expressions and collocations",
      ],
    },
    grammar: {
      score: grammarScore,
      feedback: `Your grammatical control is generally good with a mix of simple and complex structures. There are some errors in more complex sentences that occasionally affect clarity.`,
      strengths: [
        "Good control of basic sentence structures",
        "Some effective use of complex sentences",
        "Generally accurate verb tenses",
      ],
      improvements: [
        "Work on more complex sentence structures",
        "Improve accuracy with articles and prepositions",
        "Practice conditional forms and passive voice",
      ],
    },
    coherence: {
      score: coherenceScore,
      feedback: `Your responses show reasonable coherence with some good use of linking words. The organization could be improved to create more logical flow between ideas.`,
      strengths: [
        "Basic use of connective devices",
        "Generally logical sequencing of ideas",
        "Some clear paragraph organization",
      ],
      improvements: [
        "Use a wider range of linking expressions",
        "Improve transitions between main points",
        "Develop clearer introduction and conclusion elements",
      ],
    },
    overallFeedback: `Overall, you've demonstrated a reasonable ability to communicate your ideas about ${session.topic}. Your responses show good potential but would benefit from more development, precision, and organization. Continue practicing with a focus on expanding your vocabulary, developing your ideas more fully, and organizing your thoughts more coherently.`,
    sampleAnswers,
    keyVocabulary,
  };
}

function generateSampleAnswer(topic: string, part: string): string {
  // This function generates mock sample answers based on the topic and part
  // In a real application, this would be generated by an AI model

  if (part === "part1") {
    return `Yes, I find ${topic.toLowerCase()} absolutely fascinating. I've been interested in it since my university days, about 10 years ago, when I took a course that introduced me to the fundamental concepts. What I find particularly intriguing is how ${topic.toLowerCase()} connects to so many other aspects of our daily lives, often in ways we don't immediately recognize.

In my country, ${topic.toLowerCase()} has gained significant popularity in recent years, especially among younger generations. I believe this is partly due to increased awareness through social media and partly because people are recognizing its practical benefits. The way we approach ${topic.toLowerCase()} has evolved considerably, with more innovative and accessible methods becoming available to the general public.`;
  }

  if (part === "part2") {
    return `I'd like to talk about a memorable experience related to ${topic.toLowerCase()} that had a profound impact on me. This happened about three years ago when I attended a specialized workshop in the capital city.

The workshop was organized by a renowned expert in the field and brought together people from diverse backgrounds who shared a common interest in ${topic.toLowerCase()}. What made this experience particularly significant was the hands-on approach and the collaborative environment.

Several professionals and enthusiasts were involved, including a mentor who provided personalized guidance throughout the event. The discussions were incredibly stimulating, and I gained insights that I hadn't encountered in my previous studies.

This experience had such an impact on me because it completely transformed my understanding of ${topic.toLowerCase()}. I realized that my previous knowledge had been somewhat limited and theoretical. The practical applications we explored opened up new possibilities that I hadn't considered before. Additionally, the connections I made with like-minded individuals created a support network that continues to enrich my engagement with ${topic.toLowerCase()} to this day.

Since that workshop, I've approached ${topic.toLowerCase()} with greater confidence and creativity. It truly was a turning point in my personal and professional development.`;
  }

  if (part === "part3") {
    return `${
      topic.charAt(0).toUpperCase() + topic.slice(1)
    } has undergone remarkable transformations over the past decade. The most significant changes have been driven by technological advancements, shifting societal values, and increasing global interconnectedness.

One of the primary factors influencing these changes is the rapid development of digital technologies. This has democratized access to information and resources related to ${topic.toLowerCase()}, allowing more diverse perspectives to emerge and gain recognition. Additionally, economic factors have played a crucial role, as market demands have shifted toward more sustainable and ethical approaches to ${topic.toLowerCase()}.

I believe these changes have been largely positive, as they've made ${topic.toLowerCase()} more inclusive and responsive to contemporary challenges. However, there are legitimate concerns about potential negative consequences, such as the widening gap between those who have access to the latest developments in ${topic.toLowerCase()} and those who don't.

Looking ahead, I think artificial intelligence and machine learning will significantly impact how we approach ${topic.toLowerCase()}. These technologies offer unprecedented opportunities for innovation but also raise important ethical questions that we'll need to address collectively.

There are indeed fascinating cultural differences in how people engage with ${topic.toLowerCase()}. Eastern approaches often emphasize holistic and community-oriented perspectives, while Western approaches tend to focus more on individual achievement and technological solutions. These cultural nuances enrich our global understanding of ${topic.toLowerCase()} and provide valuable alternative frameworks for addressing common challenges.`;
  }

  return "Sample answer not available.";
}

function generateKeyVocabulary(topic: string, part: string): string[] {
  // This function generates mock key vocabulary based on the topic and part
  // In a real application, this would be generated by an AI model

  const commonVocabulary = [
    "significant impact",
    "fundamental aspects",
    "critical analysis",
    "comprehensive approach",
    "innovative solutions",
    "sustainable development",
    "practical implementation",
    "theoretical framework",
    "global perspective",
    "ethical considerations",
  ];

  if (part === "part1") {
    return [
      ...commonVocabulary.slice(0, 3),
      "engaging with",
      "personal interest",
      "widespread popularity",
      "recent developments",
      "future implications",
    ];
  }

  if (part === "part2") {
    return [
      ...commonVocabulary.slice(2, 5),
      "memorable experience",
      "profound impact",
      "collaborative environment",
      "practical application",
      "transformative understanding",
      "professional development",
    ];
  }

  if (part === "part3") {
    return [
      ...commonVocabulary.slice(5, 10),
      "remarkable transformation",
      "technological advancement",
      "societal values",
      "global interconnectedness",
      "contemporary challenges",
      "cultural nuances",
      "alternative frameworks",
    ];
  }

  return commonVocabulary;
}

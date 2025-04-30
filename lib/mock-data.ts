import { Submission } from "@/types/WritingExercise";

export const mockSubmissions: Submission[] = [
  {
    id: "1",
    submittedAt: "2023-06-15T14:30:00Z",
    essay:
      "The graph illustrates the birth rate for women in six different age group in the United States from 1970 to 2000. Additionally, it is clear that women in the age between 25 and 29 give birth more than the others, which peaking at the highest level on almost the time. From 1970 to 1990, women from 35 to 39 years old choose to give birth slightly increase. In 1990, women give birth in age group 25-29 fluctuated and then decreased to stand at 120,000 in 2000. Beside, there were 60,000 women under 20 years old gave birth in 1970. This figure decreased gradually to 40,000 in 2000.",
    overview: {
      totalScore: 5,
      totalFeedback:
        "Overall, the response provides a basic overview of the data but lacks coherence and has several grammatical errors. There is a need for improvement in all aspects of writing.",
      overallImprovementSuggestion:
        "To improve, focus on organizing ideas logically, using accurate grammar and vocabulary, and ensuring clarity and coherence throughout the response.",
    },
    task_response: {
      score: 4,
      feedback:
        "The response partially addresses the task by summarizing the main features of the data and making some relevant comparisons. However, the overview could be more detailed and specific.",
      corrections: [
        {
          error: "birth rate for women in six different age group",
          suggestion: "birth rate for women in six different age groups",
          end_position: 65,
          start_position: 42,
        },
        {
          error:
            "age between 25 and 29 give birth more than the others, which peaking at the highest level on almost the time",
          suggestion:
            "age group 25-29 have the highest birth rate most of the time.",
          end_position: 148,
          start_position: 82,
        },
        {
          error:
            "women from 35 to 39 years old choose to give birth slightly increase",
          suggestion:
            "the number of women aged 35 to 39 choosing to give birth slightly increased",
          end_position: 233,
          start_position: 176,
        },
      ],
      improvementSuggestion:
        "Provide a more detailed and accurate overview of the main features and comparisons in the data. Ensure all key points are covered and clearly presented.",
    },
    lexical_resource: {
      score: 4,
      feedback:
        "There is an attempt to use a range of vocabulary, but inaccuracies and repetitions are present.",
      corrections: [
        {
          error: "choose to give birth",
          suggestion: "chose to give birth",
          end_position: 192,
          start_position: 176,
        },
        {
          error: "decreased to stand at 120,000",
          suggestion: "decreased to reach 120,000",
          end_position: 315,
          start_position: 291,
        },
      ],
      improvementSuggestion:
        "Expand vocabulary usage by incorporating more precise and varied terms. Avoid repetitive language and focus on using words accurately.",
    },
    coherence_and_cohesion: {
      score: 3,
      feedback:
        "There are issues with coherence and cohesion due to inconsistent use of linking words and unclear progression of ideas.",
      corrections: [
        {
          error:
            "Additionally, it is clear that women in the age between 25 and 29 give birth more than the others, which peaking at the highest level on almost the time.",
          suggestion:
            "Furthermore, women aged 25-29 have the highest birth rate most of the time.",
          end_position: 186,
          start_position: 96,
        },
      ],
      improvementSuggestion:
        "Work on using appropriate linking words to connect ideas logically. Ensure a clear and smooth flow of information throughout the response.",
    },
    grammatical_range_and_accuracy: {
      score: 3,
      feedback:
        "The writing demonstrates a mix of simple and complex sentence structures, but there are noticeable grammatical errors throughout.",
      corrections: [
        {
          error: "women give birth in age group 25-29 fluctuated",
          suggestion:
            "the birth rate for women in the 25-29 age group fluctuated",
          end_position: 279,
          start_position: 232,
        },
        {
          error:
            "Beside, there were 60,000 women under 20 years old gave birth",
          suggestion: "Besides, 60,000 women under 20 years old gave birth",
          end_position: 424,
          start_position: 368,
        },
      ],
      improvementSuggestion:
        "Focus on sentence structure variety and accuracy. Pay attention to verb tense consistency and subject-verb agreement.",
    },
  },
  {
    id: "2",
    submittedAt: "2023-06-10T09:15:00Z",
    essay:
      "The graph shows information about renewable energy consumption in the USA between 1949 and 2008. Overall, total renewable energy use increased gradually over the period, with some fluctuations. Hydroelectric power was the main source until around 2000.\n\nIn 1949, total renewable energy consumption stood at approximately 3 quadrillion BTU, with hydroelectric power accounting for about 2 quadrillion BTU. Wood consumption remained relatively stable at around 1.5 quadrillion BTU throughout most of the period.\n\nBetween 1970 and 1990, there was a significant increase in total renewable energy use, reaching about 6 quadrillion BTU. After a slight decline in the late 1990s, consumption rose again to reach nearly 7 quadrillion BTU by 2008.\n\nNotably, wind and biofuels began to contribute to the energy mix from the 1980s onwards, with both sources showing rapid growth after 2000.",
    overview: {
      totalScore: 7.5,
      totalFeedback:
        "This is a well-structured response that covers the main features of the graph and makes appropriate comparisons. The language is generally accurate with good use of vocabulary related to trends.",
      overallImprovementSuggestion:
        "To achieve a higher band score, include more precise data comparisons and use a wider range of complex structures.",
    },
    task_response: {
      score: 8,
      feedback:
        "The response fully addresses all parts of the task with a clear overview and well-selected key features.",
      corrections: [],
      improvementSuggestion:
        "Include more specific comparisons between different energy sources to demonstrate deeper analysis.",
    },
    lexical_resource: {
      score: 7,
      feedback:
        "There is a good range of vocabulary with natural usage of terms related to trends and energy.",
      corrections: [],
      improvementSuggestion:
        "Incorporate more sophisticated vocabulary and less common lexical items to demonstrate a wider range.",
    },
    coherence_and_cohesion: {
      score: 8,
      feedback:
        "The response is well-organized with clear progression and effective use of cohesive devices.",
      corrections: [],
      improvementSuggestion:
        "Use a wider variety of cohesive devices to create even more sophisticated connections between ideas.",
    },
    grammatical_range_and_accuracy: {
      score: 7,
      feedback:
        "The response uses a mix of simple and complex structures with good control of grammar and punctuation.",
      corrections: [],
      improvementSuggestion:
        "Experiment with more complex grammatical structures while maintaining accuracy to achieve a higher score.",
    },
  },
  {
    id: "3",
    submittedAt: "2023-05-28T16:45:00Z",
    essay:
      "The graph show renewable energy consumption in USA from 1949 to 2008. Total energy use increase from about 3 to 7 quadrillion BTU. Hydroelectric power is most important source until 2000.\n\nIn 1949, total energy is 3 quadrillion BTU. Hydroelectric is 2 quadrillion BTU and wood is 1 quadrillion BTU. Energy use go up and down between 1949 and 2008.\n\nAfter 1980, wind and biofuels start to be used but they are very small amount. Wood stay almost same for whole period. By 2008, total energy reach highest point at 7 quadrillion BTU.",
    overview: {
      totalScore: 4,
      totalFeedback:
        "This response provides basic information about the graph but lacks detail and contains numerous grammatical errors. The structure is simple with limited cohesion.",
      overallImprovementSuggestion:
        "Work on grammar accuracy, especially verb tenses. Develop more detailed descriptions and use linking words to improve cohesion.",
    },
    task_response: {
      score: 5,
      feedback:
        "The response addresses the task but lacks detail in some areas and provides a limited overview.",
      corrections: [
        {
          error: "The graph show renewable energy",
          suggestion: "The graph shows renewable energy",
          start_position: 0,
          end_position: 26,
        },
        {
          error: "in USA",
          suggestion: "in the USA",
          start_position: 27,
          end_position: 33,
        },
      ],
      improvementSuggestion:
        "Include more specific details from the graph and develop a clearer overview of the main trends.",
    },
    lexical_resource: {
      score: 4,
      feedback:
        "The vocabulary is limited and repetitive with minimal use of less common items.",
      corrections: [
        {
          error: "energy use increase",
          suggestion: "energy use increased",
          start_position: 59,
          end_position: 77,
        },
        {
          error: "most important source",
          suggestion: "the most important source",
          start_position: 101,
          end_position: 122,
        },
      ],
      improvementSuggestion:
        "Use a wider range of vocabulary to describe trends and incorporate more precise terms.",
    },
    coherence_and_cohesion: {
      score: 3,
      feedback:
        "The response has limited organization with inadequate use of cohesive devices.",
      corrections: [
        {
          error: "Energy use go up and down",
          suggestion: "Energy use fluctuated",
          start_position: 190,
          end_position: 212,
        },
      ],
      improvementSuggestion:
        "Use more varied linking words and organize information more logically with clearer paragraphing.",
    },
    grammatical_range_and_accuracy: {
      score: 4,
      feedback:
        "There are frequent grammatical errors, particularly with verb tenses and articles.",
      corrections: [
        {
          error: "Wood stay almost same",
          suggestion: "Wood remained almost the same",
          start_position: 290,
          end_position: 310,
        },
        {
          error: "total energy reach highest point",
          suggestion: "total energy reached its highest point",
          start_position: 335,
          end_position: 365,
        },
      ],
      improvementSuggestion:
        "Focus on using correct verb tenses consistently and pay attention to articles and prepositions.",
    },
  },
];

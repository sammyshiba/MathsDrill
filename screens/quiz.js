import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    setIsLoading(true);
    const generatedQuestions = [];
    for (let i = 0; i < 10; i++) {
      const operator = Math.floor(Math.random() * 4); // 0: addition, 1: subtraction, 2: multiplication, 3: division
      let num1, num2, answer, question;

      switch (operator) {
        case 0: // addition
          num1 = Math.floor(Math.random() * 50) + 1;
          num2 = Math.floor(Math.random() * 50) + 1;
          answer = num1 + num2;
          question = `${num1} + ${num2} = ?`;
          break;
        case 1: // subtraction
          num1 = Math.floor(Math.random() * 50) + 1;
          num2 = Math.floor(Math.random() * 50) + 1;
          if (num1 < num2) {
            // Swap the numbers if num1 < num2 to avoid negative results
            [num1, num2] = [num2, num1];
          }
          answer = num1 - num2;
          question = `${num1} - ${num2} = ?`;
          break;
        case 2: // multiplication
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          answer = num1 * num2;
          question = `${num1} × ${num2} = ?`;
          break;
        case 3: // division
          num2 = Math.floor(Math.random() * 12) + 1;
          answer = Math.floor(Math.random() * 12) + 1;
          num1 = num2 * answer;
          question = `${num1} ÷ ${num2} = ?`;
          break;
        default:
          break;
      }

      generatedQuestions.push({
        question,
        answer: answer.toString(),
      });
    }

    setQuestions(generatedQuestions);
    setIsLoading(false);
  };

  const handleNextPress = () => {
    if (ques !== 9) {
      setQues(ques + 1);
      setUserAnswer('');
      setFeedback('');
    } else {
      handleShowResult();
    }
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[ques];
    if (userAnswer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }
  };

  const handleShowResult = () => {
    navigation.navigate('Results', {
      score: score,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
        </View>
      ) : (
        questions.length > 0 && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>What is: {questions[ques].question}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userAnswer}
                onChangeText={(text) => setUserAnswer(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedback}>{feedback}</Text>
            </View>
            <View style={styles.bottom}>
              {ques !== 9 ? (
                <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                  <Text style={styles.buttonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  feedbackContainer: {
    marginBottom: 16,
  },
  feedback: {
    fontSize: 20,
    fontWeight: '500',
    color: 'red',
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  parent: {
    height: '100%',
  },
});
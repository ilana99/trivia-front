import { get } from 'http';
import { TriviaComponent as trivia } from './trivia.component';
import { of } from 'rxjs';


describe('startGame()', () => {
    const mockApiService = {
    getTrivia: jest.fn()
    } as any;
    const mockAuthService = {} as any;
    const component = new trivia(mockApiService, mockAuthService);


    test('should clear and change allQuestions', () => {
        component.allQuestions = [{ id: 1, question: 'Test' }];

        const newQuestions = [{ id: 2, question: 'Test 2' }];
        const response = { data: newQuestions };
        mockApiService.getTrivia.mockReturnValue(of(response));

        component.startGame();

        expect(component.allQuestions).toEqual(newQuestions);
        expect(component.allQuestions).not.toEqual([{ id: 1, question: 'Test' }]);
    });
});


describe('updateAnswers()', () => {
    const mockApiService = {} as any;
    const mockAuthService = {} as any;
    const component = new trivia(mockApiService, mockAuthService);

    test('should return an empty array', () => {
    component.currentQuestionIndex = 1;
    component.allQuestions = [];

    expect(component.updateAnswers()).toEqual([]);
    });

    test('should return an array', () => {
    component.currentQuestionIndex = 1;
    component.allQuestions = [{
            "id": 6,
            "question": "What is the name of Nix's dog?",
            "answers": [
                {
                    "id": 18,
                    "answer": "February 2024"
                },
                {
                    "id": 17,
                    "answer": "Mars 2024"
                },
                {
                    "id": 16,
                    "answer": "January 2024"
                }
            ]
        },
        {
            "id": 5,
            "question": "When did Ravanis debut?",
            "answers": [
                {
                    "id": 14,
                    "answer": "Crossing Fates"
                },
                {
                    "id": 15,
                    "answer": "Sit Tight"
                },
                {
                    "id": 13,
                    "answer": "Many Many More"
                }
            ]
        }];


    expect(component.updateAnswers()).toEqual([
                {
                    "id": 14,
                    "answer": "Crossing Fates"
                },
                {
                    "id": 15,
                    "answer": "Sit Tight"
                },
                {
                    "id": 13,
                    "answer": "Many Many More"
                }]);

    });
});

describe('sendAnswer()', () => {
  const mockApiService = {
    validate: jest.fn()
    } as any;
    const mockAuthService = {} as any;
    const component = new trivia(mockApiService, mockAuthService);

    

test('should change responseStatus and score', () => {
    const data = {"status": true, "correctAnswerId": 1}; 
    const response = {data: data}
    mockApiService.validate.mockReturnValue(of(response));

    component.sendAnswer(1, 1);

    expect(component.responseStatus).toBe(true);
    expect(component.score).toBe(1);
});

test('should return the', () => {
    const storedQuestions = [{"id": 1, "question": "Test Question"}, {"id": 2, "question": "Test Question"}];

    component.sendAnswer(1, 1);

})

test('should throw error', () => {
    const data = {"status": true, "correctAnswerId": 1}; 
    const response = {data: data}
    mockApiService.validate.mockReturnValue(of(response));

    component.storedQuestions = [];
    // localStorage.setItem('questions', '[]');

    expect(() => component.sendAnswer(1, 1)).toThrow();

})

});
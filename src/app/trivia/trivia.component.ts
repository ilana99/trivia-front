import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.sass'
})
export class TriviaComponent {

  constructor(private apiService: ApiService, public authService: AuthService) { }

  allQuestions: any[] = [];
  currentAnswers: any[] = [];
  currentQuestionIndex: number = 0;
  responseStatus: boolean = false;
  answerSent: boolean = false;
  score: number = 0;
  gameStatus: string = 'playing';
  resultsParsed: any[] = [];
  storedQuestions: any[] = [];


  startGame() {
    this.apiService.getTrivia().subscribe((response) => {
      this.clear();
      this.allQuestions = response.data;
      this.updateAnswers();
      localStorage.setItem('questions', '[]');
    });
}

  get currentQuestion() {
    return this.allQuestions[this.currentQuestionIndex];
  }

  get currentQuestionText() {
    return this.allQuestions[this.currentQuestionIndex]?.question || '';
  }


  updateAnswers() {
    return this.currentAnswers = this.allQuestions[this.currentQuestionIndex]?.answers || [];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.allQuestions.length - 1) {
      this.currentQuestionIndex ++;
      this.updateAnswers();
      this.answerSent = false;
    }
  }

  sendAnswer(questionId: number, answerId: number) {
    if (this.answerSent === false || this.answerSent === null) {

    this.apiService.validate(questionId, answerId).subscribe({
      next: (response) => {
       
        if (response.data.status === true) {
          this.responseStatus = true;
          this.score++;
        } else {
          this.responseStatus = false;
        }

        const correctAnswerId = response.data.correctAnswerId; 
        this.answerSent = true;
        this.storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    
        const questionWithUserAnswer = {
            ...this.currentQuestion, 
            userAnswer: answerId,
            correctAnswer: correctAnswerId
        }
        this.storedQuestions.push(questionWithUserAnswer);
        localStorage.setItem('questions', JSON.stringify(this.storedQuestions));
       
      },
    error: (error) => {
      console.log("error: ", error)
    }})
  }}

  sendScore() {
   const date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
   if (date) {
    this.apiService.sendScore(2, date, this.score, this.allQuestions.length)
   }
   this.gameStatus = 'finished';
  }

  seeResults() {
    const results = localStorage.getItem('questions');
    this.resultsParsed = JSON.parse(results || '[]');
  }

  clear() {
    this.score = 0;
    this.answerSent = false;
    this.allQuestions = [];
    this.currentAnswers = [];
    this.currentQuestionIndex = 0;
    this.gameStatus = 'playing';
    localStorage.clear();
  }

}

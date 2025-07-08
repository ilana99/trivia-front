import { Component, output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.sass'
})
export class QuestionsComponent {

  constructor(private apiService: ApiService) { }
  
  allQuestions: any[] = [];
  currentAnswers: any[] = [];
  currentQuestionIndex: number = 0;
  responseStatus: boolean = false;
  answerSent: boolean = false;
  score: number = 0;

  onQuestionsFetched(response: any): void {
    this.allQuestions = response.data;
    this.updateAnswers();
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
      this.currentQuestionIndex ++
      this.updateAnswers();
      this.answerSent = false;
    }
  }

  sendAnswer(questionId: number, answerId: number) {
    if (this.answerSent === false || this.answerSent === null) {
      this.apiService.validate(questionId, answerId).subscribe((response) => {
        if (response.status === true ) {
          this.responseStatus = true;
          this.score ++;
        } else if (response.status === false) {
          this.responseStatus = false;
        }
        this.answerSent = true;
      })
      //
    }
    
  }
}

import { isUrl } from './js/checker'
import { handleSubmit } from './js/formHandler'
import { getSentiment, getClassification, setPostOptions } from './js/textAnalysisApi'
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/header.scss";
import "./styles/form.scss";
import "./styles/footer.scss";
import QuestionLogo from "./assets/question-640x640.jpg";

let questionLogo = document.querySelector('.logo');
questionLogo.src = QuestionLogo;

export {
    isUrl,
    handleSubmit,
    getSentiment,
    getClassification,
    setPostOptions
}
/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018.
 * Description: The controller of Exam, all access from the front end will be
 * collected here. Then, request other files from here.
 */
import {Controller, RequestMapping, RequestMethod} from 'krc';
import ExamService from '../services/ExamService';

@Controller("/exam")
class ExamController{
    constructor(){
        this.examService = new ExamService();
    }
    @RequestMapping("/queryExamList",[RequestMethod.POST])
    async queryExamList(param){
        let queryParam = param.query;
        let map = new Map();
        for (let k of Object.keys(queryParam)) {
            map.set(k, queryParam[k]);
        }
        return await this.examService.query(map, param.page);
    }
}
module.exports = ExamController;

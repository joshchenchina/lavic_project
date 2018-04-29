/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Exam business logic processor, through paging statistics.
 */
import pool from '../Dao/PGPOOL';
class ExamService{
    constructor(){
        this.table = "new_data_exam";
        this.columns = "state_school_id, subject, student_group, grade, numscored, pctadvanced, " +
            "pctproficient, pctbasic, pctbelowbasic, growth, source, state_lea_id, academic_year_end,academic_year_start";
        //this.spatialColumn = "geom";
    }

    /**
     * Query poi list # according to parameter
     *
     * @param params Map
     * @return {Promise.<void>}
     */
    async query(params, page){
        /*if(!(params instanceof Map)){
            throw new Error("Parameter Type Error");
        }*/

        /*select e.*, s.school_name
        from new_data_exam e
        LEFT JOIN school s
        on e.state_school_id = s.state_school_id*/

        let sql = `select e.*,s.school_name from ${this.table} e
        LEFT JOIN school s on e.state_school_id = s.state_school_id
        where grade in (3,8) and subject in ('Math','English Language Arts') `;
        for (let [key, value] of params.entries()) {
            sql += `and e.${key} = ${value}`
        }
        let queryCount = await pool.query(`SELECT count(1) from ${this.table}`);

        let pagination = {
            total: +queryCount.rows[0].count,
            current: page.currentPage,
            pageSize: page.pageSize
        };
        sql+= ` LIMIT ${page.pageSize} OFFSET ${page.pageSize * (page.currentPage-1)}`;
        console.info("查询poi→",sql);
        let queryResult = await pool.query(sql);
        let result = {
            sign:5,
            list:queryResult.rows,
            page:pagination
        };
        /*let result =queryResult.rows.map(row=>{
            //"SRID=4326;POINT(120 32)".match(/SRID=(\S+);POINT\((\S+) (\S+)\)/)
            //let geomElem = row.geom.match(this.geoAsEWKTRegExp);
            return new POI({
                id:row.id,
                name:row.name,
                address:row.address,
                question:row.question,
                answer1:row.answer1,
                answer2:row.answer2,
                answer3:row.answer3,
                answer4:row.answer4,
                seledanswer:row.seledanswer,
                geom:{
                    srid: geomElem[1],
                    latLng: geomElem.splice(2)
                }
            });
        });*/
        return result;
    }
}

module.exports= ExamService;

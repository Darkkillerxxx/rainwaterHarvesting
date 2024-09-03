import express from 'express';
import bodyParser from 'body-parser';
import { queryData } from './dbconfig.js';

var jsonParser = bodyParser.json()
const app = express();

app.get('/getAllDistrics',async(req,res)=>{
    const response = await queryData(`select Distinct DISTRICT from Water_Harvesting`);
    res.send({
        code:200,
        message:"Success",
        data:response.recordsets[0]
    })
})

app.get('/getDashboardValues', async (req, res) => {
    const { DISTRICT } = req.query; // Get DISTRICT from query parameters

    // Use parameterized queries to prevent SQL injection
    const talukasCountQuery = `SELECT COUNT(*) as Total_Distinct_Taluka_Count 
                               FROM (SELECT DISTINCT TALUKA FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}') AS DistinctTalukas`;
    
    const villageCountQuery = `SELECT COUNT(*) as Total_Distinct_Village_Count 
                               FROM (SELECT DISTINCT VILLAGE FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}') AS DistinctVillages`;

    const inaugrationCountQuery = `SELECT COUNT(*) as Total_Inaugration_Count 
                               FROM (SELECT * FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}' AND Inauguration_DATE IS NOT NULL) AS DistinctVillages`;
    
    const completionCountQuery = `SELECT COUNT(*) as Total_completion_Count 
                               FROM (SELECT * FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}' AND COMPLETED_DATE IS NOT NULL) AS DistinctVillages`;
    
    const totalRecords = `SELECT COUNT(*) as Total_Records FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}'`;

    const getPieChartValue = `SELECT DISTINCT TALUKA,Count(*) as count FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}' GROUP BY TALUKA;`
    // const targetCountQuery = `SELECT COUNT(*) as Total_Distinct_Targets_Count 
    //                           FROM (SELECT DISTINCT TARGET FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}') AS DistinctTargets`;

    const getStackedBarChartValue = `SELECT TALUKA, ENG_GRANT, COUNT(*) AS count FROM Water_Harvesting WHERE DISTRICT = '${DISTRICT}' GROUP BY TALUKA, ENG_GRANT;`

    try {
        const [talukasCount, villageCount, inaugrationCount, completionCount, totalRecordCount, pieChart, stackedBarChar] = await Promise.all([
            queryData(talukasCountQuery),
            queryData(villageCountQuery),
            queryData(inaugrationCountQuery),
            queryData(completionCountQuery),
            queryData(totalRecords),
            queryData(getPieChartValue),
            queryData(getStackedBarChartValue)
            // queryData(targetCountQuery, { DISTRICT })
        ]);
        console.log(talukasCount);
        const finalResponse = {
            talukasCount:talukasCount.recordset[0].Total_Distinct_Taluka_Count,
            villageCount:villageCount.recordset[0].Total_Distinct_Village_Count,
            inaugrationCount:inaugrationCount.recordset[0].Total_Inaugration_Count,
            completionCount:completionCount.recordset[0].Total_completion_Count,
            totalRecordCount:totalRecordCount.recordset[0].Total_Records,
            pieChart:pieChart.recordset,
            stackedBarChart:stackedBarChar.recordset        
        }
            // targetCount.recordset[0]
        

        res.send(finalResponse);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getAllTargets',async(req,res)=>{
    const { DISTRICT } = req.query; // Get DISTRICT from query parameter

    if (!DISTRICT) {
        return res.status(400).send({
            code: 400,
            message: "DISTRICT parameter is required"
        });
    }

    try {
        const response = await queryData(`
            SELECT count(*) as District_Wise_Target from Water_Harvesting WHERE DISTRICT = '${DISTRICT}'
        `);

        res.send({
            code: 200,
            message: "Success",
            data: response.recordsets[0]
        });

    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Internal server error",
            error: error.message
        });
    }
})

app.post('/createRecords',jsonParser,(req,res)=>{

})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`App listening on port 3000`);
})
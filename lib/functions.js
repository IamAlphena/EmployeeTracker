function viewEmployee (){
    connection.query("SELECT * FROM employee LEFT JOIN employeerole ON  employee.role_id = employeerole.id LEFT JOIN department ON employeerole.department_id = department.id;", function(err,data){
        console.table(data);
        init()
    });
}











module.exports = Functions;

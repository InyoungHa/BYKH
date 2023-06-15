$(document).ready(function () {
        $.ajax({
            "type": 'get',
            "url": '/nodes',
            "dataType": "json",
            "success": function (data) {
                $.each(data, function (idx, obj) {
                    $("#treeTable").append("<tr data-tt-id=\"" + obj.nodeId + "\" data-tt-parent-id=\"" + obj.pid + "\"><td>" + obj.text + "</td><td>" + obj.href + "</td><td><button id=\"" + obj.nodeId + "\">edit</button><button id=\"" + obj.nodeId + "\">delete</button></td></tr>");
                });
                $("#treeTable").treetable({
                    expandable: true,
                    initialState: "expanded",
                    clickableNodeNames: true,
                    indent: 30
                });
            }
        });
    });
/*
File: script.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
Andy Tran, UMass Lowell Computer Science, andy_tran1@student.uml.edu
Copyright (c) 2024 by Andy. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by AT on June 17, 2024 at 11:15 PM
*/

// File Description: 
// This file contains the JavaScript that is run to create and fill out the dynamic table.
// It also contains jQuery for form validation.

document.addEventListener('DOMContentLoaded', function () {
    // Validation rules and messages using the jQuery Validation plugin.
    // These are styled with red in the browser so they are more readable.
    $("#tableForm").validate({
        rules: {
            minRowVal: {
                required: true,
                number: true,
                range: [-100, 100],
                minRowLessThanMaxRow: true
            },
            maxRowVal: {
                required: true,
                number: true,
                range: [-100, 100],
                maxRowGreaterThanMinRow: true
            },
            minColVal: {
                required: true,
                number: true,
                range: [-100, 100],
                minColLessThanMaxCol: true
            },
            maxColVal: {
                required: true,
                number: true,
                range: [-100, 100],
                maxColGreaterThanMinCol: true
            }
        },
        messages: {
            minRowVal: {
                required: "Please enter a minimum row value.",
                number: "Minimum row value must be an integer.",
                range: "Minimum row value must be between -100 and 100.",
                minRowLessThanMaxRow: "Minimum row value must be less than or equal to the maximum row value."
            },
            maxRowVal: {
                required: "Please enter a maximum row value.",
                number: "Maximum row value must be an integer.",
                range: "Maximum row value must be between -100 and 100.",
                maxRowGreaterThanMinRow: "Maximum row value must be greater than or equal to the minimum row value."
            },
            minColVal: {
                required: "Please enter a minimum column value.",
                number: "Minimum column value must be an integer.",
                range: "Minimum column value must be between -100 and 100.",
                minColLessThanMaxCol: "Minimum column value must be less than or equal to the maximum column value."
            },
            maxColVal: {
                required: "Please enter a maximum column value.",
                number: "Maximum column value must be an integer.",
                range: "Maximum column value must be between -100 and 100.",
                maxColGreaterThanMinCol: "Maximum column value must be greater than or equal to the minimum column value."
            }
        },
        submitHandler: function (form) {
            generateTable();
        }
    });

    // Custom validation methods for min-max value comparison.
    $.validator.addMethod("minRowLessThanMaxRow", function (value, element) {
        return parseInt(value) <= parseInt($("#maxRowVal").val());
    }, "Minimum row value must be less than or equal to the maximum row value.");

    $.validator.addMethod("maxRowGreaterThanMinRow", function (value, element) {
        return parseInt(value) >= parseInt($("#minRowVal").val());
    }, "Maximum row value must be greater than or equal to the minimum row value.");

    $.validator.addMethod("minColLessThanMaxCol", function (value, element) {
        return parseInt(value) <= parseInt($("#maxColVal").val());
    }, "Minimum column value must be less than or equal to the maximum column value.");

    $.validator.addMethod("maxColGreaterThanMinCol", function (value, element) {
        return parseInt(value) >= parseInt($("#minColVal").val());
    }, "Maximum column value must be greater than or equal to the minimum column value.");

    // I decided to make a generateTable function in anticipation of part 2 of thsi 
    // assignment, which will probably require something like this to generate multiple
    // tables quickly for tabs.
    function generateTable() {
        var minRowVal = parseInt(document.getElementById('minRowVal').value);
        var maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        var minColVal = parseInt(document.getElementById('minColVal').value);
        var maxColVal = parseInt(document.getElementById('maxColVal').value);

        // Validation section for inputted integers.

        // This block initializes the error message box and sets it to empty.
        var errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = '';

        // Section for forming the dynamic table.

        // This block initializes the table container and sets it to empty (since no cells
        // have been produced yet).
        var tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = '';

        // New initializations are here after validation so the page can be a little more efficient.
        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var headerRow = document.createElement('tr');

        // This code block initializes the top-left empty header cell.
        var emptyHeaderCell = document.createElement('th');
        headerRow.appendChild(emptyHeaderCell);

        // For this block:
        // For every value from the minimum to maximum column value inputted...
        // create a header cell for the header column and populate it with its
        // corresponding value. Then add the header row.
        for (var i = minColVal; i <= maxColVal; i++) {
            var headerCell = document.createElement('th'); // Initialize a singular cell for the first column
            headerCell.textContent = i;
            headerRow.appendChild(headerCell);
        }
        thead.appendChild(headerRow);

        // For this block:
        // For every row from the min to the max, the header cell is
        // initialized with the corresponding number, as well as
        // all the row's cells, which are multiplied with the column
        // headers to get the product. Each row is then inserted into
        // the table.
        for (i = minRowVal; i <= maxRowVal; i++) {
            var row = document.createElement('tr');
            var rowHeaderCell = document.createElement('th');
            rowHeaderCell.textContent = i;
            row.appendChild(rowHeaderCell);

            // For every column value, min to max, create a cell containing
            // the product of the corresponding row and column headers
            // and populate each cell with that product.
            for (var j = minColVal; j <= maxColVal; j++) {
                var cell = document.createElement('td');
                cell.textContent = i * j;
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        // Add the header, bodies, and then the table itself is displayed.
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
});

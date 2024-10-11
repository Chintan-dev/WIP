$(document).ready(function() {
    loadWIPList();

    // Load the WIP list from localStorage
    function loadWIPList() {
        const wipList = JSON.parse(localStorage.getItem('wipList')) || [];
        const wipTableBody = $('#wipTableBody');
        wipTableBody.empty();

        wipList.forEach(wip => {
            const wipRow = `
                <tr>
                    <td>${new Date(wip.date).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-info btn-sm view-btn" data-date="${wip.date}">View</button>
                        <button class="btn btn-primary btn-sm edit-btn" data-date="${wip.date}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-date="${wip.date}">Delete</button>
                    </td>
                </tr>
            `;
            wipTableBody.append(wipRow);
        });
    }

    // Event listener for view button
    $(document).on('click', '.view-btn', function() {
        const date = $(this).data('date');
        window.location.href = `wip-detail.html?date=${date}`;
    });

    // Event listener for delete button
    $(document).on('click', '.delete-btn', function() {
        const date = $(this).data('date');
        deleteWIP(date);
        loadWIPList(); // Refresh the WIP list
    });

    // Delete WIP from localStorage
    function deleteWIP(date) {
        let wipList = JSON.parse(localStorage.getItem('wipList')) || [];
        wipList = wipList.filter(wip => wip.date !== date);
        localStorage.setItem('wipList', JSON.stringify(wipList));
    }
});

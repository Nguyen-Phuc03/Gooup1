// 2. Kiểu dữ liệu của Json
// Json có 5 kiểu dữ liệu chính : Number , String ,Boolean,Array , Object,Null
// 3. Ưu điểm của Json
// - Có thể đọc hiểu được
// - Là kiểu dữ liệu tsrên nền cơ sở Javascript nên dễ dàng tiếp cận.
// - Dữ liệu truyền tải ngắn gọn so với những định dạng dữ liệu khác như: xml, html…
// - Dễ dàng chuyển đổi(parse) dữ liệu từ dạng chuỗi (nhận từ server) sang dữ liệu có thể sử dụng được (thành Object, Number, Array)…
// - Dễ truy cập nội dung.
const fs = require('fs');
const readline = require('readline');
const filePath = './user.json';

function readUsersFromFile() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } else {
        return [];
    }
}
function writeUsersToFile(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

function getUsers(pageIndex, pageSize) {
    const users = readUsersFromFile();
    const totalDocs = users.length;
    const totalPage = Math.ceil(totalDocs / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);

    return {
        data: {
            users: paginatedUsers,
            totalPage: totalPage,
            totalDocs: totalDocs
        }
    };
}

function setUsers(userData) {
    const users = readUsersFromFile();
    users.push(userData);
    writeUsersToFile(users);
}

function updateUser(userData) {
    const users = readUsersFromFile();
    const index = users.findIndex(user => user.id === userData.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        writeUsersToFile(users);
    } else {
        console.log('User not found');
    }
}

function deleteUser(userId) {
    let users = readUsersFromFile();
    users = users.filter(user => user.id !== userId);
    writeUsersToFile(users);
}
function promptUserDetails(callback) {
    rl.question('Enter user id: ', (id) => {
        rl.question('Enter name: ', (name) => {
            rl.question('Enter role: ', (role) => {
                rl.question('Enter gender: ', (gender) => {
                    rl.question('Enter nationality: ', (nationality) => {
                        callback({
                            id: parseInt(id),
                            name,
                            role,
                            gender,
                            nationality
                        });
                    });
                });
            });
        });
    });
}

function addUser() {
    promptUserDetails((userData) => {
        setUsers(userData);
        console.log('User added successfully.');
        showMenu();
    });
}

function promptUpdateUser() {
    rl.question('Enter user id to update: ', (id) => {
        promptUserDetails((userData) => {
            userData.id = parseInt(id);
            updateUser(userData);
            console.log('User updated successfully.');
            showMenu();
        });
    });
}

function promptDeleteUser() {
    rl.question('Enter user id to delete: ', (id) => {
        deleteUser(parseInt(id));
        console.log('User deleted successfully.');
        showMenu();
    });
}


function promptGetUsers() {
    rl.question('Enter page index: ', (pageIndex) => {
        rl.question('Enter page size: ', (pageSize) => {
            const result = getUsers(parseInt(pageIndex), parseInt(pageSize));
            console.log(JSON.stringify(result, null, 2));
            showMenu();
        });
    });
}
// Khởi tạo interface để đọc dữ liệu từ console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showMenu() {
    console.log(`
        1. Add User
        2. Update User
        3. Delete User
        4. Get Users
        5. Exit
    `);
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                addUser();
                break;
            case '2':
                promptUpdateUser();
                break;
            case '3':
                promptDeleteUser();
                break;
            case '4':
                promptGetUsers();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please choose again.');
                showMenu();
                break;
        }
    });
}
showMenu();

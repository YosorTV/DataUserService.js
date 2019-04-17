// Практика с существующим API сервером https://test-users-api.herokuapp.com/

// 1. Вывести карточку юзеров. Данные получаем через /users/ – GET
// 2. В карточке юзеров отображаем: имя, возраст, кнопка удаления.
// 3. При нажатии на кнопку удаления – удаляем текущего юзера.
// 4.Не забудьте о том, что юзеров нужно добавлять! 
//      4.1 Создайте форму с полями: имя, возраст и кнопкой “Добавить” 
//      4.2 При нажатии на которую на сервере будет создаваться новый пользователь!

const URL = 'https://test-users-api.herokuapp.com/';
const container = document.querySelector('.users');
const btnAddUser = document.querySelector('.add-user');
const btnUploadUsers = document.querySelector('.show-users');

const getUsers = () => {
    return fetch(URL + 'users').then(response => {
        return response.json();
    }).catch(error => {
        console.log('can`t find users: ', error);
    });
};

const removeUser = async (userId, userCancel) => {
    try {
        await fetch(URL + 'users/' + userId, {
            method: 'DELETE'
        });
        userCancel.remove();
    } catch (error) {
        console.log('Can`t delete user ', error);
    }
};

const createUser = () => {
    const userName = document.querySelector('.name').value;
    const userAge = document.querySelector('.age').value;
    if (userName == '' || userAge == '') {
        return false;
    }
    fetch(URL + 'users', {
        method: 'POST',
        body: JSON.stringify({
            name: userName,
            age: userAge
        })
    }).then(() => {
        renderUsers({
            data: [{
                name: userName,
                age: userAge
            }]
        });
    }).catch(error => {
        console.log('Can`t create user: ', error);
    })
};

const renderElements = (item) => {
    const createUser = document.createElement('div');
    createUser.classList.add('users-card');
    createUser.innerHTML = `<p>Name: ${item.name}</p> <p>Age: ${item.age}</p>`;

    const btnRemoveUser = document.createElement('button');
    btnRemoveUser.innerHTML = 'Close';
    btnRemoveUser.addEventListener('click', () => {
        removeUser(item.id, createUser);
    });
    createUser.append(btnRemoveUser);
    container.append(createUser);
};

const renderUsers = (users) => {
    users.data.forEach(item => {
        renderElements(item);
    })
};

const init = async () => {
    const users = await getUsers();
    renderUsers(users);
};

btnUploadUsers.addEventListener('click', init);
btnAddUser.addEventListener('click', createUser);
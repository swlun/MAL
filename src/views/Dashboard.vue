<template>
    <div>
        <h1>Dashboard</h1>
        <h3>View</h3>
        <ul>
            <li><h3>Users</h3></li>
            <li v-for="user in users" v-bind:key="user.Id">
                {{ user.UserName }}
            </li>
        </ul>
    </div>
</template>

<script>
import db from '../scripts/firebaseInit'

export default {
    name: 'dashboard',
    data() {
        return {
            users: []
        }
    },
    created() {
        db.collection('Users').get().then(querySnapshot => [
            querySnapshot.forEach(doc => {
                const data = {
                    'Id': doc.id,
                    'UserId': doc.data().id,
                    'UserName': doc.data().name
                }
                console.log(data);
                this.users.push(data);
            })
        ])
    }
}
</script>
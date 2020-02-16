<template>
    <div>
        <h1>Dashboard</h1>
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
    create() {
        db.collection('Users').get().then(querySnapshot => [
            querySnapshot.forEach(doc => {
                const data = {
                    'Id': doc.id,
                    'UserId': doc.data().Id,
                    'UserName': doc.data().Name
                }
                console.log(data);
                this.users.push(data);
            })
        ])
    }
}
</script>
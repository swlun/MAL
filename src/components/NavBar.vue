<template>
    <nav>
        <v-navigation-drawer v-model="sidebarState" app hide-overlay stateless>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" router-link :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> 
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        sidebarState: {
            get: function() {
                return this.$store.getters.sidebarState;
            },
            set: function(){} 
        }
    },
    data () {
        return {
            items: [
                { title: 'Admins', icon: 'mdi-view-dashboard', link: "admins" },
                { title: 'Users', icon: 'mdi-image', link: 'users'}
            ],
        }
    }
}
</script>
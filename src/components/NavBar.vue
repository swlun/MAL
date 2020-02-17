<template>
    <nav>
        <v-card>
            <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn text color="grey">
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-toolbar>
        </v-card> 
        <v-navigation-drawer app permanent hide-overlay>
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
                <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
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
    data () {
        return {
            drawer: false,
            items: [
                { title: 'Admin', icon: 'mdi-view-dashboard', link: '' },
                { title: 'Users', icon: 'mdi-image', link: ''}
            ],
        }
    }
}
</script>
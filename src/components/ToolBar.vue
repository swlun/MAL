<template>
    <v-app-bar flat app>
        <v-app-bar-nav-icon v-on:click="ChangeSidebarState()"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn text color="grey">
            <span>Sign Out</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
</template> 
        
<script>
export default {
    name: 'ToolBar',
    computed: {
        sidebarState: {
            get: function() {
                return this.$store.getters.sidebarState;
            },
            set: function(){}
        }
    },
    methods: {
        ChangeSidebarState() {
            this.$store.dispatch('ChangeSidebarState');
        }
    }
}
</script>        

<style scoped>
</style>
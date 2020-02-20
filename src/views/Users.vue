<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Users</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <!-- User Details Dialog -->
        <v-dialog
          v-model="userDialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="userDialog = false"
              >
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Edit or Create User Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              <v-icon dense color="white">mdi-plus</v-icon>
              New Users
            </v-btn>
          </template>
          <v-card> 
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.age" type="number" label="Age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.contactNumber" label="Contact Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.occupation" label="Occupation"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedItem.student" label="Student"></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedItem.teacher" label="Teacher"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn 
        small
        class="mr-2"
        @click="ShowUserDetails(item)"
      >
        View
      </v-btn>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import db from '../scripts/firebaseInit';
export default {
    components: {
    },
    data: () => ({
        editDialog: false,
        userDialog: false,
        users: [],
        headers: [
        {
            text: 'Id',
            align: 'left',
            sortable: true,
            value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' },
        { text: 'Contact Number', value: 'contactNumber' },
        { text: 'Location', value: 'location' },
        { text: 'Occupation', value: 'occupation' },
        { text: 'Student', value: 'student' },
        { text: 'Teacher', value: 'teacher' },
        { text: 'Actions', value: 'action', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            age: 0,
            contactNumber: 0,
            location: '',
            occupation: '',
            student: false,
            teacher: false,
        },
        defaultItem: {
            name: '',
            age: 0,
            contactNumber: 0,
            location: '',
            occupation: '',
            student: false,
            teacher: false,
        },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Users' : 'Edit Users'
        },
    },

    watch: {
        editDialog (val) {
          val || this.close()
        },
        userDialog (val) {
          val || this.close()
        }
    },

    created () {
        this.initialize();
    },

    methods: {
        initialize () {
          this.$store.dispatch('GetAllUsers');
          this.users = this.$store.getters.GetAllUsers;
        },

        editItem (item) {
          this.editedIndex = this.users.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.editDialog = true
        },

        deleteItem (item) {
          var confirmation = confirm('Are you sure you want to delete this item?')
          if(confirmation) {
            db.collection('Users').doc(item.id).delete()
            .then(() => {
                this.$store.dispatch('GetAllUsers')
                .then(() => {
                  this.users = this.$store.getters.GetAllUsers;
                })
            }).catch(function(error) {
                console.error("Error removing Users: ", error);
            });
          }
        },

        ShowUserDetails(item) {
          this.editedIndex = this.users.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.userDialog = true
        },

        close () {
          this.editDialog = false
          setTimeout(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
          }, 300)
        },

        save () {
        if (this.editedIndex > -1) {
            db.collection('Users').doc(this.editedItem.id).update(this.editedItem)
            .then(() => {
                this.$store.dispatch('GetAllUsers')
                .then(() => {
                  this.users = this.$store.getters.GetAllUsers;
                })
            }).catch(function(error) {
                console.error("Error updating Users: ", error);
            });
        } else {
            db.collection('Users').add(this.editedItem)
            .then(() => {
                this.$store.dispatch('GetAllUsers')
                .then(() => {
                  this.users = this.$store.getters.GetAllUsers;
                })
            }).catch(function(error) {
                console.error("Error adding Users: ", error);
            });
        }
        this.close()
        },
    },
}
</script>
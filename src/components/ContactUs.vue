<template>
  <v-dialog dark v-model="contactMenu" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn min-width="130" large max-width="180" v-on="on" light outlined color="white">Contact Us</v-btn>
    </template>

    <v-card light>
      <v-card-title>Contact Us</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form ref="contact" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="firstNameRules"
                color="indigo"
                required
                outlined
                label="First Name"
                placeholder="Joe"
                v-model="firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                required
                :rules="lastNameRules"
                color="indigo"
                outlined
                label="Last Name"
                placeholder="Smith"
                v-model="lastName"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                required
                :rules="emailRules"
                color="indigo"
                outlined
                placeholder="email@example.com"
                label="Email"
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                required
                :rules="phoneRules"
                color="indigo"
                outlined
                label="Phone"
                placeholder="123-123-1234"
                v-model="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                required
                rows="4"
                :rules="messageRules"
                color="indigo"
                counter="255"
                prepend-inner-icon="mdi-comment-edit"
                auto-grow
                filled
                clearable
                clear-icon="mdi-close-circle"
                label="Message"
                placeholder="Send Us A Message!"
                v-model="message"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded color="red" outlined @click="close">Cancel</v-btn>
        <v-btn
          :dark="valid"
          :disabled="!valid"
          @click="postContact"
          class="white--text"
          rounded
          color="indigo"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "contact-us",
  data() {
    return {
      firstNameRules: [
        v => !!v || "First Name is required",
        v =>
          /^(([a-zA-Z.'\-",\s])+$)/.test(v) ||
          "First name should not have any numbers or special charaters!",
        v =>
          (v && v.length <= 50) ||
          "What a unique name! Just put the first letter of your first name, thanks."
      ],
      lastNameRules: [
        v => !!v || "Last Name is required",
        v =>
          /^(([a-zA-Z.'\-",\s])+$)/.test(v) ||
          "Last name should not have any numbers or special charaters!",
        v =>
          (v && v.length <= 50) ||
          "What a unique name! Just put the first letter of your last name, thanks."
      ],
      emailRules: [
        v => !!v || "Email is required",
        v =>
          /^(\s{0,5}[a-zA-Z0-9._-]{2,})@([.a-zA-Z0-9]{2,})\s{0,5}$/.test(v) ||
          "Not a valid email",
        v => (v && v.length <= 50) || "Exceeded letter\\number count!"
      ],
      phoneRules: [
        v => !!v || "Phone is required",
        v =>
          /^(\s{0,5}([\d]{3})-([\d]{3})-([\d]{4})\s{0,5})$/.test(v) ||
          "Invalid Phone number, try this format 123-123-1234",
        v => (v && v.length <= 20) || "Exceeded letter\\number count!"
      ],
      messageRules: [v => (v && v.length <= 255) || "Exceeded maximum count!"]
    };
  },

  methods: {
    ...mapActions("contact", [
      "updateFirstName",
      "updateLastName",
      "updateEmail",
      "updatePhone",
      "updateMessage",
      "updateValid",
      "updateContactMenu",
      "close",
      "createContact"
    ]),

    async postContact() {
      this.$refs.contact.validate();

      const contact = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        message: this.message
      };

      try {
        await this.createContact(contact);
        this.$swal({
          title: `Thank you! We Will be in touch soon,\n ${contact.firstName} ${contact.lastName}`,
          showCloseButton: false,
          showConfirmButton: false,
          icon: "success",
          timer: 3000,
          timerProgressBar: true
        });
      } catch (err) {
        this.$swal({
          title: `${err.response.data}`,
          showCloseButton: false,
          showConfirmButton: false,
          icon: "error",
          timer: 4000,
          timerProgressBar: true
        });
      }
    }
  },

  computed: {
    ...mapState(["contact"]),

    firstName: {
      get() {
        return this.contact.firstName;
      },
      set(firstName) {
        this.updateFirstName(firstName);
      }
    },

    lastName: {
      get() {
        return this.contact.lastName;
      },
      set(lastName) {
        this.updateLastName(lastName);
      }
    },

    email: {
      get() {
        return this.contact.email;
      },
      set(email) {
        this.updateEmail(email);
      }
    },

    phone: {
      get() {
        return this.contact.phone;
      },
      set(phone) {
        this.updatePhone(phone);
      }
    },

    message: {
      get() {
        return this.contact.message;
      },
      set(message) {
        this.updateMessage(message);
      }
    },

    valid: {
      get() {
        return this.contact.valid;
      },
      set(valid) {
        this.updateValid(valid);
      }
    },

    contactMenu: {
      get() {
        return this.contact.contactMenu;
      },
      set(contactMenu) {
        this.updateContactMenu(contactMenu);
      }
    }
  }
};
</script>

<style></style>

<template>
  <b-modal id="commentsDataModal" :header-class="variation" hide-footer centered>
    <template #modal-header="{ close }">
      <h5>{{ $t("cafe.comments") }}</h5>
      <form-button :disabled="loadInProgress" class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div v-if="modalLoadInProgress">
      <div class="content-block">
        <div class="loader">
          <css-loader></css-loader>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="new-comment">
        <text-input ref="usernameInput" :init-value="formGroup.username" :required="true" label="user.name" @input="onChange('username', $event)" />
        <div class="comment-grade">
          <b>{{ $t("cafe.food") }}</b>
          <b-form-rating v-model="formGroup.rating_food"></b-form-rating>
        </div>
        <div class="comment-grade">
          <b>{{ $t("cafe.delivery") }}</b>
          <b-form-rating v-model="formGroup.rating_delivery"></b-form-rating>
        </div>
        <text-input ref="commentInput" :init-value="formGroup.comment" :multiline="true" class="comment" label="Comment" @input="onChange('comment', $event)" />
        <form-button :disabled="!verified || loadInProgress" label="cafe.addComment" @click="addComment" />
        <div class="separator"></div>
      </div>
      <div class="comments">
        <div v-for="comment in comments" :key="comment.id" class="comment-container">
          <div class="commentator-name">{{ comment.username }}</div>
          <div class="comment-date">{{ comment.create_date }}</div>
          <div class="comment-grade">
            <b>{{ $t("cafe.food") }}</b>
            <b-form-rating v-model="comment.rating_food" readonly></b-form-rating>
          </div>
          <div class="comment-grade">
            <b>{{ $t("cafe.delivery") }}</b>
            <b-form-rating v-model="comment.rating_delivery" readonly></b-form-rating>
          </div>
          <div class="comment">{{ comment.comment }}</div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import ApiErrorHelper from "@/services/apiErrorHelper"
import TextInput from "@/components/controls/TextInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import CssLoader from "@/components/CssLoader"

export default {
  name: "CommentsFormModal",
  components: { CssLoader, TextInput, FormButton },
  mixins: [ApiErrorHelper],
  props: {
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      formGroup: this.initFormGroup(),
      comments: [],
      cafeId: undefined,
      loadInProgress: false,
      modalLoadInProgress: false
    }
  },
  methods: {
    show(cafeId) {
      this.cafeId = cafeId
      this.formGroup = this.initFormGroup()
      this.getCafeComments(cafeId)
      this.$bvModal.show("commentsDataModal")
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    initFormGroup() {
      return {
        username: "Anonymous",
        cafe_id: this.cafeId,
        rating_food: 0,
        rating_delivery: 0,
        comment: ""
      }
    },
    addComment() {
      this.loadInProgress = true
      this.$axios
        .post(ApiEndpoints.CREATE_COMMENT, FormDataService.getFormData(this.formGroup))
        .then((response) => {
          this.$store.commit("toasts/addSuccessToast", "cafe.commentAdded")
          this.resetFormGroup()
          this.comments = response.data
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
        .finally(() => {
          this.loadInProgress = false
        })
    },
    getCafeComments(cafeId) {
      this.modalLoadInProgress = true
      this.$axios
        .get(ApiEndpoints.CAFE_COMMENTS + "/" + cafeId)
        .then((response) => {
          if (response && response.data) {
            this.comments = response.data
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
        .finally(() => {
          this.modalLoadInProgress = false
        })
    },
    resetFormGroup() {
      this.formGroup = this.initFormGroup()
      this.$refs.commentInput.value = ""
      this.$refs.usernameInput.value = "Anonymous"
    }
  },
  computed: {
    verified() {
      return this.formGroup.username.length > 0 && this.formGroup.rating_food > 0 && this.formGroup.rating_delivery > 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.modal-body {
  .comment-grade {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .comment {
    margin-top: 1rem;
  }

  .comments {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .comment-container {
      border-radius: 0.428rem;
      box-shadow: $box-shadow;
      padding: 1rem;
      background-color: $light-grey;
      border: 1px solid $primary;

      .commentator-name {
        font-size: 1.2rem;
        font-weight: 500;
      }

      .comment-date {
        font-size: 0.85rem;
        margin-bottom: 1rem;
      }
    }
  }

  .btn {
    width: 100%;
  }

  .separator {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;

  .lds-dual-ring {
    height: 5rem;
    width: 5rem;
  }

  .lds-dual-ring:after {
    border-color: $primary transparent $primary transparent;
    height: 5rem;
    width: 5rem;
  }
}
</style>

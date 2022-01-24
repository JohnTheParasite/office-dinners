<template>
  <b-modal id="commentsDataModal" :header-class="variation" hide-footer centered>
    <template #modal-header="{ close }">
      <h5>{{ $t("cafe.comments") }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <div class="new-comment">
      <text-input label="user.name" :init-value="formGroup.username" @input="onChange('username', $event)" :required="true" />
      <div class="comment-grade">
        <b>{{ $t("cafe.food") }}</b>
        <b-form-rating v-model="formGroup.rating_food"></b-form-rating>
      </div>
      <div class="comment-grade">
        <b>{{ $t("cafe.delivery") }}</b>
        <b-form-rating v-model="formGroup.rating_delivery"></b-form-rating>
      </div>
      <text-input label="Comment" :multiline="true" class="comment" :init-value="formGroup.comment" @input="onChange('comment', $event)" />
      <form-button :disabled="!verified" label="cafe.addComment" @click="addComment" />
      <div class="separator"></div>
    </div>
    <div class="comments">
      <div class="comment-container" v-for="comment in comments" :key="comment.id">
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
  </b-modal>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import FaIcon from "@/components/icons/FaIcon"
import ApiErrorHelper from "@/services/apiErrorHelper"
import TextInput from "@/components/controls/TextInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"

export default {
  name: "CommentsFormModal",
  components: { TextInput, FaIcon, FormButton },
  mixins: [ApiErrorHelper],
  props: {
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      formGroup: {
        username: "Anonymous",
        cafe_id: "",
        rating_food: 0,
        rating_delivery: 0,
        comment: ""
      },
      comments: [],
      cafeId: undefined
    }
  },
  methods: {
    show(cafeId) {
      this.cafeId = cafeId
      this.initFormGroup()
      this.getCafeComments(cafeId)
      this.$bvModal.show("commentsDataModal")
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    initFormGroup() {
      this.formGroup = {
        username: "Anonymous",
        cafe_id: this.cafeId,
        rating_food: 0,
        rating_delivery: 0,
        comment: ""
      }
      this.comments = []
    },
    addComment() {
      this.$axios
        .post(ApiEndpoints.CREATE_COMMENT, FormDataService.getFormData(this.formGroup))
        .then((response) => {
          this.$store.commit("toasts/addSuccessToast", "cafe.commentAdded")
          this.$emit("refreshTable")
          this.comments = response.data
          this.initFormGroup()
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    getCafeComments(cafeId) {
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
</style>

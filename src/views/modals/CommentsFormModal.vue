<template>
  <b-modal id="commentsDataModal" :header-class="variation" hide-footer centered>
    <template #modal-header="{ close }">
      <h5>{{ $t("cafe.comments") }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <div class="new-comment">
      <text-input label="user.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" />
      <div class="comment-grade">
        <b>{{ $t("cafe.food") }}</b>
        <b-form-rating v-model="formGroup.food_grade"></b-form-rating>
      </div>
      <div class="comment-grade">
        <b>{{ $t("cafe.delivery") }}</b>
        <b-form-rating v-model="formGroup.delivery_grade"></b-form-rating>
      </div>
      <text-input label="Comment" :multiline="true" class="comment" :init-value="formGroup.comment" @input="onChange('comment', $event)" />
      <form-button :disabled="!verified" label="cafe.addComment" @click="addComment" />
      <div class="separator"></div>
    </div>
    <div class="comments">
      <div class="comment-container" v-for="comment in comments" :key="comment.id">
        <div class="commentator-name">{{ comment.name }}</div>
        <div class="comment-date">{{ comment.date }}</div>
        <div class="comment-grade">
          <b>{{ $t("cafe.food") }}</b>
          <b-form-rating v-model="comment.food_grade" readonly></b-form-rating>
        </div>
        <div class="comment-grade">
          <b>{{ $t("cafe.delivery") }}</b>
          <b-form-rating v-model="comment.delivery_grade" readonly></b-form-rating>
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
        name: "Anonymous",
        food_grade: 0,
        delivery_grade: 0,
        comment: ""
      },
      comments: [
        {
          id: 1,
          name: "Ivan Ivanovich",
          date: "Vtornik, 04.01.2022",
          delivery_grade: 3,
          food_grade: 5,
          comment: "ну кароче сам комментарий: хавчик заебочек но можно было и салфетки дать. потому -4 бала."
        },
        {
          id: 2,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        },
        {
          id: 3,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        },
        {
          id: 4,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        },
        {
          id: 5,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        },
        {
          id: 6,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        },
        {
          id: 7,
          name: "Igor Igorevich",
          date: "Sreda, 05.01.2022",
          delivery_grade: 4,
          food_grade: 5,
          comment: "ну кароче сам комментарий: под такую херовую РПГ любой хавчик найс"
        }
      ],
      cafeId: undefined
    }
  },
  methods: {
    show(cafeId) {
      this.cafeId = cafeId
      this.initFormGroup()
      this.$bvModal.show("commentsDataModal")
      // this.getCafeData(cafeId) todo after API changes get cafe data here
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    initFormGroup() {
      this.formGroup = {
        name: "Anonymous",
        food_grade: 0,
        delivery_grade: 0,
        comment: ""
      }
    },
    addComment() {
      console.log(this.cafeId)
    }
  },
  computed: {
    verified() {
      return this.formGroup.name.length > 0 && this.formGroup.food_grade > 0 && this.formGroup.delivery_grade > 0
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

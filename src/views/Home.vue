<template>
  <v-row>
    <v-col>
      <div class="grid-container">
        <v-card
          @click="openPage(card.route)"
          v-for="(card, index) in navCards"
          :key="index"
          class="nav-card text-center"
        >
          <v-img
            :src="card.img"
            class="mx-auto"
            :class="{ 'mobile-svg-size': isXs }"
          />
          <v-card-title class="d-flex justify-center mb-2"
            ><div class="card-title" :class="`card-title-${index}`">
              {{ card.title }}
            </div></v-card-title
          >
          <v-card-subtitle>{{ card.body }}</v-card-subtitle>
        </v-card>
      </div>
    </v-col>
    <v-dialog v-model="showAgreement" width="750">
      <v-card>
        <v-card-title>User Agreement</v-card-title>
        <v-card-text>
          <p>
            The material (including without limitation, advice and
            recommendation) within this program, other programs, our videos,
            blogs, podcasts and our website is provided solely as general
            educational and informational purposes. Use of this program, advice
            and information contained herein is at the sole choice and risk of
            the content consumer.
          </p>
          <p>
            You should not rely on this information as a substitute for, nor
            does it replace, professional medical advice, diagnosis, or
            treatment. If you have any concerns or questions about your health,
            you should always consult with a physician or other health-care
            professional. Do not disregard, avoid or delay obtaining medical or
            health related advice from your health-care professional because of
            something you may have read on this site. The use of any information
            provided on this site is solely at your own risk. Always consult
            your physician or healthcare provider before beginning any nutrition
            or exercise program. If you choose to use this information without
            prior consent of your physician, you are agreeing to accept full
            responsibility for your decisions and agreeing to hold harmless
            MicroHealth, its agents, employees, contractors and any affiliated
            companies from any liability with respect to injury or illness to
            you or your property arising out of or connected with your use of
            the information contained within this program, other programs, our
            videos, blogs or our website.
          </p>
          <p>
            The materials and content contained in this program, other programs,
            our videos, blogs, podcasts and our website are for general health
            information only and are not intended to be a substitute for
            professional medical advice, diagnosis or treatment. Users of this
            program, other programs, our videos, blogs, podcasts and our website
            should not rely exclusively on information provided in this program,
            other programs, our videos, blogs, podcasts, and our website for
            their own health needs. All specific medical questions should be
            presented to your own health care provider and you should seek
            medical advice before starting any type of nutrition or weight loss
            or fitness program.
          </p>
          <p>
            MicroHealth reserves the right to update or change information
            contained in this program, other programs, our videos, blogs,
            podcasts, and our website at any time. MicroHealth is not
            responsible for information appearing at hyperlinks.
          </p>
          <p>
            Developments in medical research may impact the health, fitness and
            nutritional advice that appears here. No assurance can be given that
            the advice contained in this site will always include the most
            recent findings or developments with respect to the particular
            material.
          </p>
          <p>
            Exercise is not without its risks and this or any other exercise
            program many result in injury. As with any exercise program, if at
            any point during your workout you begin to feel faint, dizzy or have
            physical discomfort, you should stop immediately and consult a
            medical professional. You should rely on your own review, inquiry
            and assessment as to the accuracy of any information made available
            within this program or via this web site.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" outlined>Accept</v-btn>
          <v-btn color="secondary" outlined>Decline</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  name: "Home",
  mixins: [utilitiesMixin],
  data() {
    return {
      showAgreement: true,
      navCards: [
        {
          title: "Set Some Goals",
          body: "Create and track goals to help you on your wellness journey",
          img: "/svg/personal-goals-bro.svg",
          route: "/activities/goals",
        },
        {
          title: "Schedule an Activity Reminder",
          body: "Choose a category, time, and content-type, and enjoy daily wellness reminders",
          img: "/svg/time-management-bro.svg",
          route: "/activities/reminders",
        },
        {
          title: "Browse Fitness Videos",
          body: "Take a wellness break and follow along with a quick fitness video",
          img: "/svg/training-at-home-bro.svg",
          route: "/activities/videos",
        },
        {
          title: "Browse Wellness Articles",
          body: "Read articles filled with useful wellness tips and information",
          img: "/svg/online-article-bro.svg",
          route: "/activities/articles",
        },
      ],
    };
  },
  methods: {
    openPage(route) {
      this.$router.push(route);
    },
  },
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  async mounted() {
    //
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
::v-deep .v-card__title {
  word-break: unset;
  font-size: 16px;
}
.mobile-svg-size {
  width: 200px;
  height: 200px;
}
.card-title {
  line-height: 1;
  border-bottom: 5px solid #fff;
  -webkit-transition: border 500ms ease-out;
  -moz-transition: border 500ms ease-out;
  -o-transition: border 500ms ease-out;
  transition: border 500ms ease-out;
}
.nav-card:hover .card-title-0 {
  border-bottom: 5px solid var(--mh-orange);
}
.nav-card:hover .card-title-1 {
  border-bottom: 5px solid var(--mh-green);
}
.nav-card:hover .card-title-2 {
  border-bottom: 5px solid var(--mh-blue);
}
.nav-card:hover .card-title-3 {
  border-bottom: 5px solid var(--mh-orange);
}
</style>

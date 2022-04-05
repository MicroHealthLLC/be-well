<template>
  <v-row>
    <v-col>
      <v-card class="pa-5">
        <v-card-title>User Agreement</v-card-title>
        <v-card-subtitle class="font-italic"
          ><strong>Last Updated:</strong> {{ new Date() }}</v-card-subtitle
        >
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
          </p></v-card-text
        >
        <v-card-actions>
          <v-btn class="px-10" depressed color="var(--mh-blue)" dark
            >Accept</v-btn
          >
          <v-btn outlined color="secondary">Decline</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>

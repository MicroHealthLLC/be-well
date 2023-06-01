<template>
  <div>
    <div
      class="d-flex justify-center flex-column mx-auto competition-container"
    >
      <div class="d-flex justify-end mb-2 align-center">
        <v-btn
          to="/events/competitions"
          exact-path
          color="#2f53b6"
          dark
          outlined
          small
          ><v-icon>mdi-arrow-left</v-icon>Campaigns</v-btn
        >
        <v-btn
          v-if="isEditor"
          :to="`/events/competitions/edit/${competition.id}`"
          class="ml-2"
          outlined
          small
          ><v-icon left small>mdi-pencil</v-icon>Edit</v-btn
        >
      </div>
      <v-card class="px-0" flat color="#f0f3f7">
        <v-chip color="var(--mh-blue)" dark class="category-chip" x-small label
          >CAMPAIGN</v-chip
        >
        <v-card-title class="px-0 pt-0 text-h4 break-word">{{
          competition.title
        }}</v-card-title>
        <v-card-subtitle class="d-flex flex-column px-0"
          ><div class="mb-2">Hosted by: {{ competition.hostName }}</div>
          <!-- beginning of chips  -->
          <div>
            <v-chip
              v-if="this.competition.campaignType"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-bullhorn-variant</v-icon
              >{{ this.competition.campaignType }}</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Mental Health'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-brain</v-icon>Mental Health</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Fitness'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-run</v-icon>Fitness</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Weight Loss'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-scale-bathroom</v-icon>Weight Loss</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Cooking'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-chef-hat</v-icon>Cooking</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Balance'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-gymnastics</v-icon>Balance</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Nutrition'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-food-apple</v-icon>Cooking</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Stretch'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-yoga</v-icon>Stretch</v-chip
            >
            <v-chip
              v-if="this.competition.category === 'Miscellaneous'"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-shape-plus</v-icon>Miscellaneous</v-chip
            >
            <v-chip
              v-if="this.competition.isPrivate"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-lock</v-icon>Private</v-chip
            >
            <v-chip
              v-if="!this.competition.isPrivate"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-lock-open-variant</v-icon>Public</v-chip
            >
            <!-- <v-chip 
            v-if="this.competition.isAnonymous"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-incognito</v-icon
            >Anonymous</v-chip
          > -->
            <v-chip
              v-if="this.competition.groupParticipation"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-human-queue</v-icon>Group</v-chip
            >
            <v-chip
              v-if="!this.competition.groupParticipation"
              class="mr-2"
              color="primary"
              small
              outlined
            >
              <v-icon small left>mdi-human</v-icon>Individual</v-chip
            >
            <v-chip color="primary" outlined small>{{
              timeDistance(
                competition.startDate,
                competition.startTime,
                competition.timeZone
              )
            }}</v-chip>
          </div>
          <!-- end of chips -->
        </v-card-subtitle>
        <v-divider class="mx-0 mb-5 pa-0" color="#9ec64c"></v-divider>
        <div v-if="competition.imageURL" class="px-0">
          <v-img
            lazy-src="/img/placeholder.png"
            :src="competition.imageURL"
            class="header-image mx-0 fill-width"
            max-height="400"
            ><template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  size="50"
                  width="5"
                  indeterminate
                  color="var(--mh-orange)"
                ></v-progress-circular>
              </v-row> </template
          ></v-img>
          <v-divider class="mx-0 mt-5 pa-0" color="#9ec64c"></v-divider>
        </div>
        <v-card-text class="px-0 row mt-4 ml-1">
          <!-- Competition Details -->
          <div class="tabs col-6 pr-6" style="width: 100%">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              height="35"
              dense
            >
              <v-tabs-slider color="var(--mh-green)">></v-tabs-slider>
              <v-tab>Details</v-tab>
              <v-tab>Submissions</v-tab>
              <v-tab v-if="this.competition.groupParticipation">Groups</v-tab>

              <v-tabs-items v-model="tab" class="pt-5">
                <v-tab-item class="mb-5">
                  <div class="pb-2">
                    <strong class="pr-2"
                      ><v-icon small left>mdi-calendar</v-icon>Begins:</strong
                    >
                    {{ longISODate(competition.startDate) }} at
                    {{ competition.startTime }} {{ competition.timeZone }}
                  </div>
                  <div class="pb-2">
                    <strong class="pr-2"
                      ><v-icon small left>mdi-calendar</v-icon>Ends:</strong
                    >{{ longISODate(competition.endDate) }} at
                    {{ competition.endTime }} {{ competition.timeZone }}
                  </div>
                  <div class="pb-2 text-truncate">
                    <strong class="pr-2 break-all"
                      ><v-icon small left>mdi-account</v-icon>Hosted By:</strong
                    >{{ competition.hostName }}
                  </div>
                  <div class="pb-2 text-truncate">
                    <strong class="pr-2 break-all"
                      ><v-icon small left>mdi-email-outline</v-icon>Host
                      Email:</strong
                    >
                    <a :href="`mailto: ${competition.hostEmail}`">{{
                      competition.hostEmail
                    }}</a>
                  </div>
                  <div
                    class="d-flex flex-column description text-pre-wrap pb-2 mt-5"
                  >
                    <div><strong class="pr-2">Description:</strong></div>
                    <div>{{ competition.description }}</div>
                  </div>
                  <div class="d-flex flex-column rules text-pre-wrap pb-2 mt-2">
                    <div><strong class="pr-2">Rules:</strong></div>
                    <div>{{ competition.rules }}</div>
                  </div>
                </v-tab-item>
                <!-- Submission Photos -->
                <v-tab-item class="mb-5">
                  <!-- Submissions only allowed if Campaign has started -->
                  <div class="d-flex justify-start mb-8">
                    <v-btn
                      v-if="tab == 1 && isCompeting(competition)"
                      @click="openSubmissionForm"
                      small
                      :disabled="
                        !startTimePassed(
                          competition.startDate,
                          competition.startTime,
                          competition.timeZone
                        )
                      "
                      outlined
                      >Add Submission<v-icon small right
                        >mdi-plus</v-icon
                      ></v-btn
                    >
                  </div>
                  <div
                    v-if="
                      startTimePassed(
                        competition.startDate,
                        competition.startTime,
                        competition.timeZone
                      ) && competition.submissions.items.length === 0
                    "
                    class="d-flex justify-center align-center pa-10"
                  >
                    No One has submitted anything yet...
                  </div>
                  <div
                    v-else-if="
                      !startTimePassed(
                        competition.startDate,
                        competition.startTime,
                        competition.timeZone
                      ) && competition.submissions.items.length === 0
                    "
                    class="d-flex justify-center align-center pa-10"
                  >
                    {{ competition.title }} has not started yet...
                  </div>

                  <div v-else class="photo-grid">
                    <div
                      v-for="submission in this.getDisplayedSubmissions()"
                      :key="submission.id"
                      class="d-flex mx-auto align-center justify-center"
                    >
                      <video
                        v-if="submission.type == 'VIDEO'"
                        @click="openVideo(submission, $event)"
                        :src="submission.url"
                        height="100%"
                        class="clickable"
                      ></video>
                      <amplify-s3-image
                        @click="openPhoto(submission)"
                        v-else
                        :img-key="submission.s3Key"
                        class="clickable"
                      ></amplify-s3-image>
                      <div
                        v-if="submission.isApproved"
                        class="label"
                        title="Approved Submission"
                      >
                        <v-icon color="success"
                          >mdi-check-circle-outline</v-icon
                        >
                      </div>
                    </div>
                  </div>
                  <v-btn
                    v-if="sortedSubmissions.length > 25"
                    class="ma-10"
                    right
                  >
                    View all {{ sortedSubmissions.length }} submissions
                  </v-btn>
                </v-tab-item>
                <!-- Beginning of Groups Tab -->
                <v-tab-item>
                  <!-- Add a new Group -->
                  <v-btn
                    v-if="isEditor"
                    @click="openNewGroupForm"
                    small
                    outlined
                    class="d-flex justify-start mb-3"
                    >Add Group<v-icon small right>mdi-plus</v-icon>
                  </v-btn>
                  <!-- Display Groups -->
                  <div
                    v-if="competition.groups.items.length <= 0"
                    class="d-flex justify-center align-center pa-10"
                  >
                    No groups yet...
                  </div>
                  <div class="group-cards pb-7" v-else>
                    <GroupCard
                      v-for="group in sortedGroups"
                      :key="group.groupName"
                      :group="group"
                      :isEditor = isEditor
                      :items="getGroupedCompetitors(group.groupName)"
                      @click.native=openEditGroupForm(group)
                    >
                    </GroupCard>
                  </div>
                </v-tab-item>
                <!-- End of Groups Tab -->
              </v-tabs-items>
            </v-tabs>
          </div>
          <!-- Leaderboard Tables -->
          <!-- Leaderboard if campaign has group participation -->
          <div class="leaderboard col-6 px-6">
            <v-tabs
              v-if="competition.groupParticipation"
              v-model="lb_tab"       
              background-color="transparent"
              height="35"
              dense
            >
              <v-tabs-slider color="var(--mh-green)">></v-tabs-slider>
              <v-tab>Group</v-tab>
              <v-tab>Individual</v-tab>

              <v-tabs-items v-model="lb_tab">
                <!-- Beginning of tab 1 -->
                <v-tab-item>
                    <v-card elevation="5" class="ma-3">
                    <v-data-table
                      ref="leaderboard"
                      class="leaderboard-table"
                      :headers="headersGroup"
                      :items="groups"
                      sort-by="score"
                      sort-desc
                      no-data-text="No groups have been made yet"
                    >
                      <template #[`item.groupName`]="{ item }">{{
                        item.groupName
                      }}</template>
                      <template v-slot:top>
                        <div class="leaderboard-title">
                          <v-icon left>mdi-trophy</v-icon>Leaderboard
                        </div></template
                      >
                    </v-data-table>
                    </v-card>
                </v-tab-item>
                <!-- End of tab 1 -->

                <!-- Beginning of tab 2 -->
                <v-tab-item>
                  <v-card elevation="5" class="ma-3">
                    <v-data-table
                      ref="leaderboard"
                      class="leaderboard-table"
                      :headers="headers"
                      :items="competitors"
                      sort-by="score"
                      sort-desc
                      no-data-text="No one has signed up yet"
                    >
                      <template #[`item.lastName`]="{ item }"
                        >{{ item.firstName }} {{ item.lastName }}</template
                      >
                      <template v-slot:top>
                        <div class="leaderboard-title">
                          <v-icon left>mdi-trophy</v-icon>Leaderboard
                        </div></template
                      >
                    </v-data-table>
                  </v-card>
                </v-tab-item>
                <!-- End of tab 2 -->
              </v-tabs-items>
            </v-tabs>

            <!-- If individual participation -->
            <v-card v-else elevation="5">
            <v-data-table
              ref="leaderboard"
              class="leaderboard-table"
              :headers="headers"
              :items="competitors"
              sort-by="score"
              sort-desc
              no-data-text="No one has signed up yet"
            >
              <template #[`item.lastName`]="{ item }"
                >{{ item.firstName }} {{ item.lastName }}</template
              >
              <template v-slot:top
                ><div class="leaderboard-title">
                  <v-icon left>mdi-trophy</v-icon>Leaderboard
                </div></template
              >
            </v-data-table>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions class="px-0">
          <v-btn
            v-if="
              !isCompeting(competition) &&
              deadlinePassed(competition.deadline, competition.timeZone) ===
                'green'
            "
            @click="joinCompetition"
            class="px-5"
            color="var(--mh-blue)"
            dark
            >Join Campaign<v-icon right>mdi-plus</v-icon></v-btn
          >
          <!-- Confirm dialog to withdraw from campaign -->
          <v-btn
            v-else-if="
              isCompeting(competition) &&
              deadlinePassed(competition.deadline, competition.timeZone) ===
                'green'
            "
            @click="withdrawDialog = true"
            outlined
            >Withdraw from Campaign</v-btn
          >
          <!-- disabled join and withdraw buttons -->
          <v-alert v-else color="gray" outlined dense
            ><v-icon left color="red">mdi-alert-outline</v-icon>Deadline to
            join/withdraw has passed</v-alert
          >
          <v-dialog v-model="withdrawDialog" width="50%">
            <v-card>
              <v-card-text style="position: relative; top: 18px"
                >Are you sure you want to withdraw from
                <strong>{{ competition.title }}</strong
                >?
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  @click="withdrawDialog = false"
                  color="secondary"
                  small
                  outlined
                  >Cancel</v-btn
                >
                <v-btn
                  @click="leaveCompetition"
                  class="px-5"
                  color="var(--mh-blue)"
                  small
                  dark
                  >Withdraw</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End confirm dialog for withdrawing from campaign -->
        </v-card-actions>
      </v-card>
    </div>
    <!-- Submission Dialog -->
    <v-dialog v-model="submissionDialog" width="700">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><div>Add Submission</div>
          <v-spacer></v-spacer>
          <v-btn @click="closeSubmissionForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <v-form ref="submissionform" :disabled="saving">
            <div class="manual-score">
              <!-- Manual Scoring -->
              <v-text-field
                v-if="competition.manualScoring"
                prepend-icon="mdi-tally-mark-5"
                type="number"
                placeholder="Amount"
                v-model="newSubmission.mAmount"
                :suffix="competition.unit"
                :rules="[
                  (v) => !!v || 'Amount is required',
                  (v) => parseFloat(v) > 0.0 || 'Invalid amount',
                ]"
                required
              ></v-text-field>
              <!-- End of Manual Scoring -->
              <v-file-input
                v-model="newSubmission.media"
                @change="uploadMedia"
                @click:clear="removeMedia"
                label="Photo or Video"
                accept="image/*,video/*"
                prepend-icon="mdi-camera"
                truncate-length="50"
                required
                :rules="mediaRules"
              ></v-file-input>
            </div>
            <v-textarea
              v-model="newSubmission.description"
              label="Description (optional)"
              class="mt-2"
              filled
              outlined
              counter="300"
              rows="4"
              auto-grow
              required
              :rules="[(v) => v.length <= 300 || 'Max 300 characters']"
            ></v-textarea>
          </v-form>
          <div v-if="mediaURL" class="submission-container">
            <v-img
              v-if="newSubmission.media.type.includes('image')"
              class="submission"
              :src="mediaURL"
              contain
            ></v-img>
            <video
              v-else
              class="submission"
              @loadeddata="setVideoDuration"
              id="submission-video-player"
              :src="mediaURL"
              controls
              width="100%"
            ></video>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="submitMedia"
            class="px-5"
            :disabled="saving"
            color="var(--mh-blue)"
            depressed
            :dark="!saving"
            :loading="saving"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- New Group Dialog -->
    <v-dialog v-model="newGroupDialog" width="450">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><div>Add New Group</div>
          <hr class="group_hr" />
          <v-spacer></v-spacer>
          <v-btn @click="closeNewGroupForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <v-form ref="newgroupform" :disabled="saving">
            <!-- Enter Group Name -->
            <v-text-field
              v-model="newGroup.groupName"
              label="Group Name"
              outlined
              required
              :rules="[
                (v) => v.length <= 25 || 'Max 25 characters',
                (v) =>
                  allGroupNames.includes(v.trim()) === false ||
                  'Group Name already exists',
                (v) => !!v || 'Group Name is required',
              ]"
            ></v-text-field>
            <!-- Add members to the group -->
            <h3 class="mt-0">
              <strong> Participants available to add </strong>
            </h3>
            <template v-if="ungroupedCompetitors.length !== 0">
              <hr class="group_hr" />
              <v-row
                style="min-height: 100px; max-height: 200px; overflow-y: auto"
              >
                <v-col class="pa-0" cols="6">
                  <ul
                    v-for="competitor in ungroupedCompetitors"
                    :key="competitor.id"
                    style="
                      list-style-type: none;
                      max-height: 2rem;
                      margin-bottom: 0;
                    "
                  >
                    <li>
                      <v-checkbox
                        class="p_checkbox"
                        v-model="selected"
                        :value="competitor"
                        :label="
                          competitor.firstName + ' ' + competitor.lastName
                        "
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </template>
            <p v-else class="pl-0.75">
              <br />No participants available at this time
            </p>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="submitGroup()"
            class="px-5"
            :disabled="saving"
            color="var(--mh-blue)"
            depressed
            :dark="!saving"
            :loading="saving"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit Group Dialog -->
    <v-dialog v-model="editGroupDialog" width="450" v-if="isEditor">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title class="pb-0"
          ><div>Edit Group</div>
          <v-spacer></v-spacer>
          <v-btn @click="closeEditGroupForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <hr class="group_hr" />
        <v-card-text>
          <v-form ref="editgroupform" :disabled="saving">
            <!-- Edit Group Name -->
            <v-text-field
              v-model="curr_group_name"
              label="Group Name"
              outlined
              required
              :rules="[
                (v) => v.length <= 30 || 'Max 30 characters',
                (v) => !!v || 'Group Name is required',
              ]"
            ></v-text-field>
            <!-- Edit members of the group -->
            <h3 class="mt-0">
              <strong> Participants available to edit or add </strong>
            </h3>
            <template v-if="curr_available.length !== 0">
              <hr class="group_hr" />
              <v-row
                style="min-height: 100px; max-height: 200px; overflow-y: auto"
              >
                <v-col class="pa-0" cols="6">
                  <ul
                    v-for="competitor in curr_available"
                    :key="competitor.id"
                    style="
                      list-style-type: none;
                      max-height: 2rem;
                      margin-bottom: 0;
                    "
                  >
                    <li>
                      <v-checkbox
                        class="p_checkbox"
                        v-model="curr_selected"
                        :value="competitor"
                        :label="
                          competitor.firstName + ' ' + competitor.lastName
                        "
                      ></v-checkbox>
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </template>
            <p v-else class="pl-0.75">
              <br />No participants available at this time
            </p>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="deleteGroupDialog = true"
            class="px-5 mr-2"
            :disabled="saving"
            color="secondary"
            outlined
            depressed
            :dark="!saving"
            :loading="saving"
            >Delete</v-btn
          >
          <!-- Confirm Dialog to delete group -->
          <v-dialog v-model="deleteGroupDialog" width="25%">
            <v-card>
              <v-card-text style="position: relative; top: 18px"
                >Are you sure you want to delete
                <strong>{{ this.curr_group_name }}</strong
                >?
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  @click="deleteGroupDialog = false"
                  color="secondary"
                  small
                  outlined
                  >Cancel</v-btn
                >
                <v-btn
                  @click="removeGroup"
                  class="px-5"
                  color="var(--mh-blue)"
                  small
                  dark
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            @click="updateGroup()"
            class="px-5"
            :disabled="saving"
            color="var(--mh-blue)"
            depressed
            :dark="!saving"
            :loading="saving"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Photo Dialog -->
    <v-dialog
      v-model="photoDialog"
      class="overflow-auto"
      style="transform-origin: center center; display: contents"
    >
      <v-card max-width="700" style="margin: auto">
        <div class="d-flex justify-end pr-5 pt-2">
          <v-btn @click="photoDialog = false" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <v-card-title class="px-0"
          ><v-img :src="dialogPhoto.src" max-height="500" contain
        /></v-card-title>

        <v-card-text class="text-caption">
          <div>
            <strong>Submitted By: </strong>{{ dialogPhoto.submittedBy }}
          </div>
          <div v-if="competition.manualScoring">
            <strong>{{ competition.unit }}: </strong>{{ dialogPhoto.mAmount }}
          </div>
          <div><strong>Description: </strong>{{ dialogPhoto.description }}</div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <div v-if="isEditor">
            <v-btn
              v-if="!selectedSubmission.isApproved"
              @click="approve"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Approve Submission</v-btn
            >
            <v-btn
              v-else
              @click="deny"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Deny Submission</v-btn
            >
          </div>
          <v-btn
            v-if="canRemoveSubmission"
            @click="deleteDialog = true"
            class="ml-2"
            small
            depressed
            outlined
            :loading="saving"
            ><v-icon small left>mdi-delete</v-icon>Delete</v-btn
          >
          <!-- Confirm dialog for remove submission -->
          <v-dialog v-model="deleteDialog" width="50%">
            <v-card>
              <v-card-text style="position: relative; top: 18px"
                >Are you sure you want to delete this submission?
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  @click="deleteDialog = false"
                  color="secondary"
                  small
                  outlined
                  >Cancel</v-btn
                >
                <v-btn
                  @click="removeSubmission"
                  @change="removeSubmission = false"
                  class="px-5"
                  color="var(--mh-blue)"
                  small
                  dark
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End of confirm dialog for delete submission -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Video Dialog -->
    <v-dialog v-model="videoDialog" class="overflow-auto">
      <v-card width="700" style="margin: auto">
        <div class="d-flex justify-end pr-5 pt-2">
          <v-btn @click="videoDialog = false" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="dialog-video-container my-3">
          <video
            class="dialog-video"
            :src="dialogVideo.src"
            frameborder="5px"
            controls
          ></video>
        </div>

        <v-card-text class="text-caption">
          <div>
            <strong>Submitted By: </strong>{{ dialogVideo.submittedBy }}
          </div>
          <div v-if="competition.manualScoring">
            <strong>{{ competition.unit }}: </strong>{{ dialogVideo.mAmount }}
          </div>
          <div><strong>Description: </strong>{{ dialogVideo.description }}</div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <div v-if="isEditor">
            <v-btn
              v-if="!selectedSubmission.isApproved"
              @click="approve"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Approve Submission</v-btn
            >
            <v-btn
              v-else
              @click="deny"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Deny Submission</v-btn
            >
          </div>
          <v-btn
            v-if="canRemoveSubmission"
            @click="removeSubmission"
            class="ml-2"
            small
            depressed
            outlined
            :loading="saving"
            ><v-icon small left>mdi-delete</v-icon>Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dateMixin from "../../mixins/date-mixin";
import GroupCard from "../../components/GroupCard.vue";

export default {
  name: "Competition",
  components: {
    GroupCard,
  },
  mixins: [dateMixin],
  data() {
    return {
      withdrawDialog: false,
      deleteDialog: false,
      submissionDialog: false,
      newGroupDialog: false,
      editGroupDialog: false,
      deleteGroupDialog: false,
      curr_group: null,
      curr_group_name: "",
      curr_selected: [],
      curr_available: [],
      selected: [],
      photoDialog: false,
      videoDialog: false,
      videoDuration: null,
      mediaURL: null,
      dialogPhoto: {
        src: "",
        description: "",
        submittedBy: "",
        mAmount: null,
      },
      dialogVideo: {
        src: "",
        description: "",
        submittedBy: "",
        mAmount: null,
      },
      tab: null,
      lb_tab: null,
      newSubmission: {
        media: null,
        description: "",
        mAmount: null,
      },
      newGroup: {
        groupName: "",
        score: 0,
      },
      selectedSubmission: {},
      headers: [
        {
          text: "Name",
          value: "lastName",
        },
        {
          text: "Score",
          value: "score",
        },
      ],
      headersGroup: [
        {
          text: "Group Name",
          value: "groupName",
        },
        {
          text: "Score",
          value: "score",
        },
      ],
      mediaRules: [
        (v) => !!v || "A photo or video is required",
        () =>
          this.newSubmission.media?.type.includes("image") ||
          this.videoDuration <= 300 ||
          "Video duration must be less than 5 minutes",
      ],
    };
  },
  computed: {
    ...mapGetters([
      "competition",
      "competitors",
      "submissions",
      "groups",
      "isEditor",
      "saving",
      "user",
    ]),
    sortedSubmissions() {
      let submissions = this.submissions 
      submissions.sort((a,b) => { 
        return new Date(b.createdAt) - new Date(a.createdAt); //sort submission list by descending createdAt time
      })
      return submissions //return the sorted submission list
    },
    competitorId() {
      return this.competition.competitors.items.find(
        (competitor) => competitor.userId == this.user.attributes.sub
      ).id;
    },
    ungroupedCompetitors() {
      return this.competition.competitors.items.filter(
        (competitor) => competitor.groupName === ""
      );
    },
    allGroups() {
      return this.competition.groups.items;
    },
    allGroupNames() {
      return this.competition.groups.items.map((group) => group.groupName);
    },
    sortedGroups() {
      let groups = this.groups;
      groups.sort(function (a, b) {
        // sort alphabetically
        if (a.groupName < b.groupName) {
          return -1;
        }
        if (a.groupName > b.groupName) {
          return 1;
        }
        return 0;
      });
      return groups; //return the sorted list
    },
    additionalCompetitors() {
      return [
        ...this.competition.competitors.items,
        {
          firstName: "John",
          lastName: "Doe",
          score: 150,
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          score: 250,
        },
      ];
    },
    canRemoveSubmission() {
      return (
        this.selectedSubmission.userId == this.user.attributes.sub ||
        this.isEditor
      );
    },
  },
  methods: {
    ...mapActions([
      "addCompetitor",
      "addSubmission",
      "addGroup",
      "approveSubmission",
      "deleteSubmission",
      "deleteGroup",
      "denySubmission",
      "fetchCompetition",
      "deleteCompetitor",
      "updateCompetitorById",
      "updateGroupById",
    ]),
    joinCompetition() {
      let competitor = {
        userId: this.user.attributes.sub,
        competitionId: this.competition.id,
        firstName: this.user.attributes.given_name,
        lastName: this.user.attributes.family_name,
        groupParticipation: this.competition.groupParticipation,
        groupName: "",
      };
      this.addCompetitor(competitor);
    },
    leaveCompetition() {
      this.deleteCompetitor(this);
      this.withdrawDialog = false;
    },
    typeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
    isCompeting({ competitors }) {
      let index = competitors.items
        ? competitors.items.findIndex(
            (competitor) => competitor.userId == this.user.attributes.sub
          )
        : -1;

      return index >= 0 ? true : false;
    },
    getDisplayedSubmissions() {
      if(this.competition.submissions.items.length > 25)
        return this.sortedSubmissions.slice(0, 25);
      return this.sortedSubmissions;
    },
    getGroupedCompetitors(gn) {
      return this.competition.competitors.items.filter(
        (competitor) => competitor.groupName === gn
      );
    },
    getAvailableCompetitors(gn) {
      let ungrouped = this.competition.competitors.items.filter(
        (competitor) => competitor.groupName === ""
      );
      let curr = this.getGroupedCompetitors(gn);
      return curr.concat(ungrouped);
    },
    uploadMedia(e) {
      if (e) {
        const file = e;
        this.mediaURL = URL.createObjectURL(file);
      }
    },
    removeMedia() {
      this.mediaURL = null;
    },
    async submitGroup() {
      if (!this.$refs.newgroupform.validate()) {
        return;
      }

      // assign groups to selected participants (grouping them)
      for (let i = 0; i < this.selected.length; i++) {
        await this.updateCompetitorById({
          id: this.selected[i].id,
          groupName: this.newGroup.groupName,
        });
      }

      //add up all scores of members to calculate group score
      let memberScores = this.selected.map((member) => member.score);
      let s = 0;
      for (let i = 0; i < memberScores.length; i++) {
        s += memberScores[i];
      }

      let group = {
        competitionId: this.competition.id,
        groupName: this.newGroup.groupName,
        score: s,
      };

      this.selected = [];
      await this.addGroup(group);
      this.closeNewGroupForm();
    },
    async updateGroup() {
      if (!this.$refs.editgroupform.validate()) {
        return;
      }

      //add up all scores of members to calculate group score
      let memberScores = this.curr_selected.map((member) => member.score);
      let s = 0;
      for (let i = 0; i < memberScores.length; i++) {
        s += memberScores[i];
      }

      this.updateGroupById({
        id: this.curr_group.id,
        groupName: this.curr_group_name,
        score: s,
      });

      // assign groups to selected participants (grouping them)
      for (let i = 0; i < this.curr_selected.length; i++) {
        this.updateCompetitorById({
          id: this.curr_selected[i].id,
          groupName: this.curr_group_name,
        });
      }

      // unassign groups to de-selected participants
      let deselected = this.competition.competitors.items.filter(
        (competitor) => competitor.groupName === this.curr_group_name
      );
      deselected = deselected.filter(
        (competitor) => this.curr_selected.includes(competitor) === false
      );
      console.log(deselected);
      for (let i = 0; i < deselected.length; i++) {
        this.updateCompetitorById({
          id: deselected[i].id,
          groupName: "",
        });
      }

      this.curr_selected = [];
      this.closeEditGroupForm();
    },
    async submitMedia() {
      if (!this.$refs.submissionform.validate()) {
        return;
      }

      let mediaType = this.newSubmission.media.type.includes("image")
        ? "PHOTO"
        : "VIDEO";

      let submission = {
        competitorId: this.competitorId,
        competitionId: this.competition.id,
        userId: this.user.attributes.sub,
        media: this.newSubmission.media,
        isApproved: true,
        description: this.newSubmission.description,
        submittedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
        type: mediaType,
        manualScoring: this.competition.manualScoring,
        scoringVal: this.competition.scoringVal,
        mAmount: this.newSubmission.mAmount,
      };
      await this.addSubmission(submission);
      this.closeSubmissionForm();
    },
    openPhoto(submission) {
      let photoURL = submission.url;
      this.dialogPhoto.description = submission.description;
      this.dialogPhoto.src = photoURL;
      this.dialogPhoto.submittedBy = submission.submittedBy;
      this.dialogPhoto.unit = submission.unit;
      this.dialogPhoto.mAmount = submission.mAmount;
      this.photoDialog = true;
      this.selectedSubmission = submission;
    },
    openVideo(submission, e) {
      let video = e.target;
      video.onplay = () => video.pause();
      this.dialogVideo.description = submission.description;
      this.dialogVideo.src = video.currentSrc;
      this.dialogVideo.submittedBy = submission.submittedBy;
      this.dialogVideo.unit = submission.unit;
      this.dialogVideo.mAmount = submission.mAmount;
      this.videoDialog = true;
      this.selectedSubmission = submission;
    },
    openSubmissionForm() {
      this.newSubmission = { photo: null, description: "", mAmount: null };
      this.mediaURL = null;
      this.submissionDialog = true;
      if (this.$refs.submissionform) {
        this.$refs.submissionform.resetValidation();
      }
    },
    closeSubmissionForm() {
      this.submissionDialog = false;
      this.videoDuration = null;
    },
    openNewGroupForm() {
      this.newGroup = { groupName: "", score: 0 };
      this.newGroupDialog = true;
      if (this.$refs.newgroupform) {
        this.$refs.newgroupform.resetValidation();
      }
    },
    closeNewGroupForm() {
      this.newGroupDialog = false;
      this.selected = [];
    },
    openEditGroupForm(cg) {
      this.curr_group = cg;
      this.curr_group_name = cg.groupName;
      this.curr_selected = this.getGroupedCompetitors(cg.groupName);
      console.log(this.curr_selected);
      this.curr_available = this.getAvailableCompetitors(cg.groupName);
      console.log(this.curr_group);
      this.editGroupDialog = true;
      if (this.$refs.editgroupform) {
        this.$refs.editgroupform.resetValidation();
      }
    },
    closeEditGroupForm() {
      this.editGroupDialog = false;
    },
    removeGroup() {
      this.deleteGroup(this.curr_group);
      // members of deleted group must have their group updated to empty
      for (let i = 0; i < this.curr_selected.length; i++) {
        this.updateCompetitorById({
          id: this.curr_selected[i].id,
          groupName: "",
        });
      }
      console.log(this.allGroups);
      this.deleteGroupDialog = false;
      this.editGroupDialog = false;
    },
    async approve() {
      await this.approveSubmission(this.selectedSubmission);
      this.selectedSubmission.isApproved = true;
    },
    async deny() {
      await this.denySubmission(this.selectedSubmission);
      this.selectedSubmission.isApproved = false;
    },
    removeSubmission() {
      this.deleteSubmission(this.selectedSubmission);
      this.photoDialog = false;
      this.videoDialog = false;
    },
    setVideoDuration() {
      let videoPlayer = document.getElementById("submission-video-player");
      this.videoDuration = videoPlayer.duration;
    },
  },
  mounted() {
    this.fetchCompetition(this.$route.params.competitionId);
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1.95fr 1.05fr;
  column-gap: 2rem;
}
/* .description,
.rsvp {
   grid-column: 1 / span 2; 
} */
.break-word {
  word-break: break-word;
}
.break-all {
  word-break: break-all;
}
.text-pre-wrap {
  white-space: pre-wrap;
}
a {
  text-decoration: none;
}
.leaderboard-table {
  margin-top: 16px;
}
::v-deep .leaderboard-title {
  font-size: 24px;
  padding-left: 16px;
  padding-top: 16px;
  font-weight: bold;
  color: var(--mh-orange);
}
.leaderboard {
  border-left: solid 1px var(--mh-green);
}
::v-deep .v-data-footer {
  color: var(--mh-orange);
}
/* .leaderboard-table {
  border: 1px solid gray;
} */
/* In case we want to change the background color on hover */
/* .leaderboard-table >>> tr:hover {
   filter: brightness(105%); 
} */
.v-tabs-items {
  background-color: transparent;
}
.v-tab {
  text-transform: capitalize;
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  grid-auto-rows: 125px;
  grid-gap: 1rem;
}
.photo-grid > div {
  background-color: black;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.label {
  border: 1px solid #4caf50;
  background-color: white;
  position: absolute;
  border-radius: 5px;
  top: 5px;
  right: 5px;
}
amplify-s3-image {
  --width: 125%;
  position: relative;
  transform: translateX(-10%);
}
@media (max-width: 600px) {
  .grid {
    display: flex;
    flex-direction: column;
  }
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
  }
}
.dialog-video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  background-color: black;
}
.dialog-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.submission-container {
  max-height: 500px;
  background-color: black;
}
.submission {
  max-height: inherit;
}
.manual-score {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
}
::v-deep .p_checkbox .v-label {
  margin-top: 1 rem;
  padding: 0px;
}

::v-deep .group_hr {
  margin-top: 1.75rem;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 255);
}

.group-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 1em;
  grid-column-gap: 1em;
}
</style>

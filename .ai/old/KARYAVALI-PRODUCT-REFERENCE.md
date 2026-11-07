# Karyavali — Product Reference

**Status:** Draft — product-owner review pending  
**Version:** 1.2  
**Updated:** 7 November 2026  
**Scope:** Target product behavior for the expanded mobile application

## 1. Status and meaning

This document is the single product reference for designing and building Karyavali. It defines the required capabilities, behavior, permissions, defaults, and scope. Its draft status must be resolved by product-owner review before it is used as approved build scope.

Karyavali combines personal task management with collaboration, phone-based identity, WhatsApp sharing, reminders, recurring tasks, and task relationships.

“Must” describes required behavior. “Default” describes the initial value before a permitted user changes it. “Optional” means the person can leave a field unset or skip an action; it does not mean the feature can be omitted.

Presentation and technology are separate concerns. This reference defines features and their consequences without choosing visual layouts, frameworks, services, or providers. The images in `screenshots/` illustrate product identity only. They do not define task rules or feature scope.

## 2. Purpose and scope

Karyavali helps people capture work, assign responsibility, follow up, and finish tasks. It serves personal tasks, family errands, staff coordination, office work, and assignments to service providers.

The product is a mobile-first application for Android and iOS. Core work remains available offline after sign-in. Collaboration must remain understandable without enterprise administration or project-management terminology.

The required feature set is:

- Phone-based sign-in, profile name, and optional avatar.
- Active and dormant recipients; personal contact naming.
- Tasks, notes, importance, deadlines, and checklist steps.
- One or multiple assignees, individual permissions, and two completion policies.
- Comments and an activity history.
- Parent/child tasks, blockers, and other task relationships.
- Personal/shared lists and personal saved views.
- Search, filtering, sorting, favorites, and batch actions.
- Manual WhatsApp text sharing.
- One-time and repeating reminders through In-App and WhatsApp destinations.
- Recurring tasks.
- Local-first work with explicit synchronization outcomes.
- Light/dark/system appearance and support information.

This version excludes a separate desktop product, attachments, standalone chat, boards, analytics dashboards, billing, AI-generated tasks, organization administration, public task links, shared saved views, reactions, mentions, and read receipts. Data migration and changing a registered account’s own phone number are outside scope.

## 3. People, identity, and onboarding

### 3.1 Identity

A verified mobile phone number identifies an account. A phone number can belong to only one account at a time. People with the same name remain different people when their verified numbers differ. A contact alias never establishes account ownership.

An **active user** has completed registration. A **dormant user** is a phone-number identity created when someone assigns work to that number before registration. Dormant people are legitimate recipients.

Task assignees are individual people. WhatsApp group labels are external-sharing shortcuts and cannot be task assignees or shared-list members.

### 3.2 First use

Sign-in is required before creating or accessing tasks. There is no guest mode.

The journey is phone number → OTP verification → profile name → optional avatar → welcome. The name is required; avatar setup can be skipped. Profile name and avatar can subsequently be edited.

Phone entry includes a country code. OTP errors, expiry, resend waiting periods, and request failures must report the actual verification state and provide correction/retry. Timing and code length follow the selected verification service’s enforced values; displayed values must match those values.

Contact access and notification access are requested in context and are optional. Denying either permission does not prevent task creation.

### 3.3 Returning, offline, and logout

A previously signed-in person can access their saved work offline on that device. A first-time sign-in requires connectivity. When authentication expires, existing saved work remains accessible on the previously authenticated device; remote actions wait for successful reauthentication.

Logout requires connectivity and a completed synchronization of pending work. If either condition is unmet, explain why logout is unavailable and retain the session. Successful logout removes account tasks, comments, contact mappings, and other private account content from the device. Switching accounts requires logout followed by sign-in; account content is never combined.

### 3.4 Dormant registration and action

Tasks can be assigned directly to any contact with a valid phone number, whether active or dormant. Assignment takes effect without an invitation, acceptance, or recipient approval. Lists can also be shared directly with those contacts. After a dormant person registers and verifies that number, their existing assigned tasks and shared lists are available automatically; no acceptance step is required.

A dormant person cannot directly change task status, comment, or acknowledge a reminder without registering. The creator can record completion on their behalf under Section 7. This is recorded as the creator’s action, not as an action performed by the dormant person.

## 4. Contacts and names

### 4.1 Directory

People can add, edit, search, import, and remove personal contacts. Manual entries require a name and valid international phone number. Contact search covers local name, phone, and available email.

Device contacts are refreshed on app opening when permission is already granted and through a manual refresh action. Permission is requested only when the person chooses a contact feature that requires it. Import alone never assigns tasks or shares lists; the person explicitly chooses those actions.

Repeated imports match by normalized phone number. A matching number updates local contact information. Different numbers are not merged by matching names or emails. A device contact with several numbers produces number-labeled choices such as “Ramesh (Mobile)” and “Ramesh (Work).” Contacts without usable numbers can remain visible but cannot be selected for assignment or membership.

Denied contact permission leaves manual phone entry available. Imported contact names, email, and address-book photos remain personal to the viewer. Registration discovery checks selected/entered phone numbers; importing the address book does not publish it to other people.

### 4.2 Display-name rules

Apply these rules, in order, everywhere a person is shown:

1. Use the viewer’s local contact alias when available, including an alias entered manually in Karyavali.
2. Otherwise, use the active user’s profile name.
3. Otherwise, show a masked dormant phone number with its country code and only the first five national digits visible; replace remaining national digits with X. If the national number contains five or fewer digits, mask all national digits.

Dormant people also show **Not on Karyavali yet**. Use an available personal contact photo first, then the person’s profile avatar, then initials or a neutral fallback. Private aliases and address-book photos are never exposed to collaborators.

Removing a contact removes the personal alias and directory entry only. It does not unassign tasks, delete an account, or revoke shared access. Viewing that person then follows the remaining name rules.

## 5. Tasks and personal versus shared information

### 5.1 Required and optional fields

The title is the only required field for a new task. Notes, assignment, deadline, list placement, importance, steps, relationships, reminders, and recurrence can be left unset.

A task can be unassigned, assigned to Self, or assigned to several people. The creator retains access and management authority whether or not they are an assignee.

### 5.2 Shared task information

Title, notes, due date/timezone, assignees, completion policy, execution status, checklist steps, child relationships, other relationships, comments, and recurrence belong to the shared task. A permitted change affects everyone who can access it.

**Important** is personal to each viewer. Marking a task important changes only that person’s Important collection, sorting, and outbound message preference. It does not mark the task important for collaborators.

Private list placement, saved views, favorites, contact aliases, and share-format preferences are also personal. Reminders belong to their creator and explicitly selected recipients as defined in Section 17.

### 5.3 Creation and editing

A new task requires an explicit Create action. Repeated taps/retries create one logical task. Blank titles are rejected with input retained. Other failed create attempts also retain entered work.

Creation inherits only the entry context: the selected private list or a shared list owned by the creator, the current user’s important flag when entering from Important, Self when entering from Assigned to Me, or the selected person when entering from that person’s task collection. A custom view does not automatically apply every saved filter as task data.

Edits to an existing task save automatically. Leaving a task flushes pending local edits. Saved locally and Synced are different outcomes; synchronization failure does not discard the local draft. Only people with the relevant permission can change shared fields.

### 5.4 Lifecycle

Execution states are **Pending, In Progress, and Completed**. A new task starts Pending. Authorized people can move between Pending and In Progress, complete work, and reopen completed work. Reopening returns the affected work to Pending.

**Blocked** is derived from unmet dependencies or unfinished child tasks. It is not a manually selectable execution state. Blocked work can be marked In Progress, but cannot be completed. Due Today and Overdue are date conditions, not execution states.

A task’s archive state is separate from execution status. Archiving hides it from normal collections without changing completion. Task completion requires all checklist steps checked as well as blockers/children completed; shared-mode manual completion checks remaining steps atomically with completion. An all-required task’s final person cannot complete until its steps are already checked.

## 6. Assignment and permissions

### 6.1 Completion policy

Every task has a completion policy. **Shared completion** is the default. The creator can select **All-assignees-required** when the task has at least two assignees.

| Policy | Completion behavior |
| --- | --- |
| Shared completion | One authorized assignee or the creator completes the task for everyone. |
| All-assignees-required | Every current assignee has an individual status. The task completes when every current assignee is complete. |

In all-required mode, task status is Pending if everyone is pending, In Progress if anyone has started or completed a part while others remain unfinished, and Completed when all are complete.

### 6.2 Permission defaults

The creator has all task permissions permanently. Only the creator and ancestor creators under Section 8 can change assignee permissions or completion policy. Ownership cannot be transferred in this version.

Each newly added assignee receives these defaults:

| Permission | Default | Scope |
| --- | --- | --- |
| Change status | On | Shared task status in shared mode; own part in all-required mode |
| Comment | On | Post a comment |
| Edit task details | Off | Shared title, notes, deadline, steps, and task relationships; excludes assignees, permissions, policy, and recurrence. Also allows creating reminders for assignees. |
| Delegate / create child tasks | Off | Create and manage a child task as its creator |
| Reassign | Off | Add/remove assignees, without changing permissions or ownership |
| Delete/archive | Off | Archive, unarchive, or delete the entire task, subject to Section 19 |

The creator can switch each grant on or off per assignee. Removing Change status leaves the creator responsible for recording that person’s progress. Permission labels must describe that consequence.

Self-assignment gives the creator no extra identity or separate ownership. Being assigned does not expose the creator’s other tasks or private lists.

### 6.3 Assignment changes

People with Reassign can add/remove assignees. Newly added people receive default grants; the reassigning person cannot elevate them. The creator cannot be removed as owner; they can be removed as an assignee.

In all-required mode, a new assignee starts Pending and existing people retain their progress. Removing an assignee removes that person from the required total. Either change recalculates task completion. If one or zero assignees remain, the task switches to Shared completion. With one remaining assignee, retain Completed if that person’s part is completed and completion prerequisites remain met; otherwise retain their Pending/In Progress state. With zero remaining assignees, retain Completed only if the task was already completed, otherwise set Pending. Confirm changes that reopen or complete the task.

Changing completion policy is allowed only while the task is not Completed. Switching to All-required resets each person’s part to Pending. Switching to Shared sets the task Pending. Confirm the reset before applying it. Completed tasks must first be reopened.

## 7. Individual progress and completion

In shared mode, an authorized assignee or creator can change global status. Reopening completed work reopens it for everyone.

In all-required mode, an authorized assignee changes only their own part. The creator can update any person’s part, including a dormant person’s part, and the activity records both the actor and whose part changed. There is no separate “force complete” action that bypasses the required people.

If a person’s part is complete while others remain, show **My part completed** and the overall count separately. Example: Karan and Amit completed, Rajesh pending → **2 of 3 completed**; the task remains In Progress.

Reopening one part leaves the other parts unchanged and recalculates global status. Blockers and unfinished children prevent every transition into Completed, including creator-recorded progress and batch completion. Existing completed parts remain complete if a new blocker is added; the remaining people cannot complete until the blocker is resolved.

A completed task cannot receive new blockers, children, or checklist steps until reopened.

## 8. Checklist steps and child tasks

### 8.1 Checklist steps

Keep lightweight steps alongside full child tasks. A step has a title and checkbox, with no independent assignee, deadline, permissions, or comments. People with Edit task details manage step titles and add/delete steps. People with Change status can check/uncheck steps; the creator can do both.

A task displays completed/total step progress. Reordering steps is outside this version.

Steps are shared checklist state. In Shared completion mode, checking the last step attempts to complete the task. It succeeds only when the actor can change status and all blockers/children are complete; otherwise steps remain checked and the task stays open with an explanation. Completing a shared-mode task manually checks its steps.

In all-required mode, completing steps does not complete anyone’s part. People complete their parts separately; the last required completion is permitted only when all steps are checked. Completing an individual part earlier does not check steps for other people.

Unchecking a step on a completed task reopens the task: Shared mode returns to Pending; All-required returns every person’s part to Pending. Explain and confirm that consequence before changing it. Reopening a task through its status control retains checked steps.

### 8.2 Full child tasks

A child is a complete task with one parent. A task can have multiple children and multiple levels of descendants, but cannot be its own ancestor. Every child has its own assignees, permissions, status, steps, deadline, and completion policy.

Creating a child preselects the parent’s assignees with default permissions and Shared completion. Child fields can be edited before creation. The person creating the child owns that child. The creator of every ancestor also has full management authority on descendants: edit fields, manage assignees/grants/policy, record any part’s progress, and archive/unarchive/delete. References to creator-only actions in this document include these ancestor creators for a descendant. These rights do not transfer ownership and cannot be removed by changing direct grants.

People who can see a parent can see its descendants. Direct access to a child does not reveal a restricted parent’s title or other children. A child creator must be shown this parent-derived access consequence before creation.

An unfinished child blocks parent completion. Completing the parent does not complete its children. Completing all children removes that restriction but does not automatically complete the parent. Changing a completed child back to unfinished is blocked while any ancestor remains Completed; the ancestor must be reopened first.

Edit task details on the child and parent-management authority are both required to detach or move a child. Moving is allowed only between accessible, noncompleted parents; moving the child cannot create a cycle. The confirmation lists any new people receiving access through the destination parent.

## 9. Notes, comments, and activity

Notes describe the work and are shared editable task details. Comments are attributed updates. Only the creator and assignees with Comment can post. Read-only list members cannot comment unless separately assigned with that grant.

Each comment shows author, time, and whether it is pending synchronization or failed. Failed text remains available for retry. Comment editing/deletion is outside this version; a correction is posted as a new comment.

Activity records creation, shared field changes, assignment, permission changes, completion policy changes, status/progress, steps, parent/relationship changes, archive/unarchive, list access changes, and creator-recorded actions on behalf of others. It records actor and time. Original authors and actors are not rewritten after a phone-number reassignment.

Personal importance, personal list placement, contact aliases, and private reminder configuration are not published in shared activity. Comments and activity remain with the task while it is active or archived; deletion removes them from user access with the task.

## 10. Relationships and blockers

| Relationship | Defined meaning |
| --- | --- |
| Child/subtask | A full task beneath one parent; unfinished children prevent parent completion. |
| Blocked by | Source task cannot complete until the referenced task is Completed. |
| Related to | Symmetric informational link; no status or access effect. |
| Duplicate of | Source is a duplicate of the referenced task; informational only, with no merge, closure, or data copying. |
| Clone | Creates a new independent task and records its origin; it does not establish ongoing synchronization. |
| Caused by | Source task arose because of the referenced task; informational and directional. |

Adding/removing links requires Edit task details on the source and visibility of the target. Symmetric Related to removal requires Edit task details on either accessible endpoint. Linking does not grant access. Inaccessible references show **Restricted task**, without title, notes, people, or deadline.

A task can have several blockers. Self-links, duplicate identical links, hierarchy cycles, and blocking cycles are rejected. Completing the blockers unblocks the task without completing it. Reopening a blocker is prohibited while it has Completed dependents; reopen those dependents first.

An archived blocker remains blocking unless already Completed. Deleting a blocker leaves an **Unavailable blocker** restriction on open dependents. Someone allowed to edit each dependent must explicitly remove that link before completion becomes available. No dependency is silently treated as satisfied by deletion.

Clone copies title, notes, and unchecked step titles. It creates a Pending, unassigned task owned by the person cloning, with Shared completion, no deadline, recurrence, reminders, children, comments, permissions, or list placement. A visible task can be cloned by its creator or an assignee with Edit task details. Read-only access does not permit cloning.

## 11. Dates and urgency

A deadline is a calendar day, valid until 23:59:59 on that day in the task’s stored timezone. New deadlines use the creating/editing person’s device timezone and keep that timezone until the deadline is explicitly changed. All viewers see the intended deadline day; travel does not shift it.

Presets are Today, Tomorrow, and Next Week. Next Week means next Monday. Clearing a deadline removes it without changing reminders. Exact-time task deadlines are outside this version; reminders have their own times.

Only unfinished, unarchived tasks become Overdue. Completed tasks are not overdue. Shared deadline edits require Edit task details and affect everyone. Due Today uses the task’s stored deadline day/timezone.

## 12. Personal and shared lists

A list is an explicit collection of tasks, not a saved search. A task can be in zero, one, or multiple lists. It remains one task everywhere. Removing list placement and deleting a task are different actions.

### 12.1 Private lists

New lists are Private by default. Only the list owner sees its name, membership, color, and task placement. The owner can create, rename, recolor, search, pin/unpin, and delete it. Deleting it preserves tasks.

People can add any accessible task to their private lists. This never changes the creator’s organization, shared access, or other people’s private lists. A task that later becomes inaccessible disappears from personal lists and views.

### 12.2 Shared lists and membership

A list owner shares a list by selecting contacts with valid phone numbers, including dormant people. Sharing directly adds each selected person as a member and grants list access without an invitation, acceptance, or approval step. Active users see the list after synchronization. Dormant members receive the same membership immediately and can access the list automatically after registering with that number. There is no invited, awaiting-acceptance, or declined membership state. A share made offline is saved locally and becomes visible to others after synchronization; synchronization is not recipient acceptance.

Members receive read access to list tasks. There are two list roles: Owner and Member. Only Owner can rename/recolor the shared list, directly add/remove members, or delete the list. Members cannot manage membership or add/remove tasks. They can leave the list after confirmation. Ownership transfer is outside this version.

Only the list owner can add/remove tasks in the shared collection, and they can add only tasks they created or have ancestor-creator authority over. Members cannot add their own tasks to someone else’s shared list. There is no task-placement approval flow. Membership does not grant task editing, comments, assignment, or completion; those actions require direct task permissions. Creating from a read-only shared list does not preselect that shared list and explains that the person can create a personal task instead.

Making a private list shared requires confirmation of its task-access consequences. Existing tasks not owned by the list owner remain in that owner’s personal placement and are excluded from the shared collection; report those exclusions before confirming.

Removing membership or deleting a shared list removes only list-derived access. Direct assignment, creation, and access through another shared list or parent remain valid. Deleting the list preserves tasks. Shared lists cannot be converted back to Private; the owner can remove members or delete the collection.

### 12.3 Counts

A list shows unfinished task count and progress as Completed / total active, unarchived tasks accessible through the list. Members see the same shared collection; personal importance and personal filtering can differ.

## 13. Views, search, and filters

A saved view is personal live filtering over accessible tasks. People can create, name, rename, recolor, pin/unpin, and delete it. Filters and sorting are saved automatically; search text is temporary and not saved. Deleting a view preserves tasks. Views cannot be shared.

Search is scoped to the current collection and matches title, notes, visible assignee names, visible list names, and displayed deadline text. It supports approximate matching and relevance ranking. It excludes comments and inaccessible information. Contacts and list directories have their own search.

Filters combine with AND across groups:

| Filter | Choices and meaning |
| --- | --- |
| Status | All, Open (Pending + In Progress), Pending, In Progress, Completed |
| Blocked | All, Blocked, Unblocked |
| Importance | All, Important, Normal; viewer’s personal flag |
| Deadline | All, Today, Tomorrow, Overdue, Has Date, No Date |
| List | All or one accessible collection |
| Assignee | All, Unassigned, or one selected person; matches when that person is any assignee |
| Creator | All, Me; Me identifies work created by the viewer |

Archived/deleted tasks are excluded. Important collection always applies personal Important; Assigned to Me always applies the viewer’s assignment. Other filters narrow those fixed collections without removing their defining condition. Clearing filters preserves the defining condition.

## 14. Sorting and collection results

Tasks appear in Open and Completed groups. Each group follows its selected sort. Default is Smart Sort, which orders open work as:

1. Overdue, earliest deadline first.
2. Due today through three additional calendar days, earliest deadline first, then personally important first.
3. Other personally important tasks, dated before undated, earlier deadlines before later, then newest created first.
4. Remaining backlog using the same dated/undated and recency ordering.

Stable ties use newest creation then the task’s stable identifier. Reverse Smart Sort reverses this order. Completed results use completion time, newest first, when Smart Sort is selected.

Other choices are Due Date (earliest/latest; undated last in either direction), Creation Date (newest/oldest), and Alphabetical (A–Z/Z–A). Search relevance takes precedence during a search, with the selected sort breaking equal relevance. Sorting is remembered per collection.

Built-in task badges count accessible, unarchived tasks that are globally unfinished. Assigned to Me additionally requires the viewer’s own part to be unfinished. Personal importance affects only the viewer’s Important badge.

## 15. Assigned to Me and batch work

Assigned to Me includes self-assigned and received work. Its main results show the person’s unfinished responsibility with Overdue, Due Today, In Progress, and Blocked conditions available through filters. A **My part completed** filter shows the person’s completed responsibility, including all-required tasks still globally open. A separate **Task completed** filter shows globally completed assignments. These assignment-specific filters override the normal global Status filter for that result.

People can find work they created using Creator = Me, then narrow by assignee and save a view. A separate Assigned by Me primary destination is outside scope.

Selection supports selecting individual tasks, all currently matched tasks across the collection, and clearing selection. Actions are explicit rather than mixed-selection toggles: Mark complete, Reopen, Mark important, Remove important, Set/Clear deadline, Add assignees, Replace assignees, Unassign all, Add to private lists, Share on WhatsApp, Archive, and Delete.

Add assignees preserves existing people; Replace assignees substitutes the selected set; Unassign all removes all people. These actions follow assignment-change rules, including completion resets. Batch list placement is additive and applies to private lists; shared-list placement is managed per task to make access changes explicit.

An all-required assignee’s Mark complete/Reopen affects their own part. For a creator selecting multiple all-required tasks, completion also affects only their own part when assigned; other people’s parts must be updated individually from task details. A creator not assigned cannot batch-complete an all-required task.

Evaluate each task’s permissions and restrictions. Apply eligible changes and show changed/skipped counts with reasons for skipped items. Do not report all-success after partial success. Batch deletion/archive and responsibility changes that reset progress require a scope confirmation.

## 16. Manual WhatsApp sharing

Manual sharing prepares text for one task, selected tasks, a list, or a view. The person completes sending in WhatsApp. Opening prepared text is never described as delivery, acknowledgement, or task completion. Sharing text does not grant Karyavali access or change assignees.

Recipients are a saved contact, Self, an entered phone number, or a person/group selected in WhatsApp. Named WhatsApp group shortcuts are personal labels only.

Collection scopes are Pending (all globally unfinished tasks in that collection), All (all active, unarchived tasks in it), and Current view (the current search/filter results). All-required work is included in Pending while globally unfinished, even when the sender’s own part is complete.

Styles are Modern, Executive, and Crisp, with Executive as the default. Every style includes task title and completion state. People can include/exclude notes, assignee names, their personal Important label, steps, due information, and list/view name. All inclusion options default On except Important, which defaults Off.

Per-send choices override remembered collection preferences, which override global preferences. Recipient and scope can be remembered per list/view; default collection scope is Pending. When sharing a task, private list names are excluded by default and require a deliberate include-private-list-names choice on that send. Other people’s private list names are never available to send.

Messages include the exact previewed content; Copy writes that content to the clipboard. Collection output uses one fixed readable layout; compact/detailed layout selection is outside scope. An empty selection or unavailable WhatsApp produces an explanation and leaves Preview/Copy available. No sent/delivered history is inferred from preparing or opening text.

## 17. Reminders

### 17.1 Ownership, recipients, and destination

A creator or assignee with Edit task details can create reminders for Self or current task assignees. A person without that permission can create reminders for Self only. No one can edit another person’s reminder; the task creator can cancel task reminders. Archive, deletion, completion, and responsibility changes also stop affected reminders under the rules below.

Every reminder has one owner, one recipient, a start date/time, destination, and repeat choice. Several recipients require separate reminders. Destination is In-App or WhatsApp. Default is Self, In-App, Once; the date/time must be chosen explicitly.

In-App means a persistent reminder event in Karyavali and a device notification when the recipient has enabled notifications. Denied notification permission does not remove the in-app event.

WhatsApp means automatic scheduled delivery to the selected person’s number, not opening a composer. It requires the recipient to have registered, enabled WhatsApp reminders, and confirmed consent for that destination. Dormant or nonconsenting recipients are unavailable for scheduled WhatsApp delivery; manual WhatsApp sharing remains available. Task assignment and direct list sharing do not by themselves enable scheduled WhatsApp reminders.

### 17.2 Schedule and acknowledgement

Repeat choices are Once, Every day, and Every N hours until acknowledged, where N is a positive whole number. Reminder dates/times use the reminder owner’s timezone captured at creation and retain that timezone during travel. There are no quiet-hour settings in this version; deliver at the chosen schedule subject to recipient consent.

Acknowledge is an explicit recipient action in Karyavali. It acknowledges the reminder series, not task completion. Opening WhatsApp or reading a notification does not acknowledge. The owner can cancel; the recipient can stop reminders addressed to themselves.

All repeating deliveries stop on acknowledgement, cancellation, task archive/deletion, or recipient removal as assignee for an assignee-addressed reminder. Shared task completion stops all task reminders. In all-required mode, completing the recipient’s part stops that person’s reminders even if others remain unfinished. Reopening work does not restart stopped reminders; a new reminder must be created.

Editing an unacknowledged reminder changes future deliveries only. An owner changes a failed/pending schedule and can retry; delivered events retain their actual times.

### 17.3 Offline and delivery outcomes

Saving offline creates Pending schedule, not Scheduled. Scheduling requires accepted synchronization. Once Scheduled, delivery must not require the owner’s app to remain open.

If the first chosen time passed before scheduling succeeds, produce one immediate reminder and calculate future repeats from the original schedule; do not replay every missed interval. When delivery is temporarily unavailable, retry at the next available opportunity but coalesce multiple missed reminders into one. Canceled, acknowledged, or completed work is checked again before sending.

States are Pending schedule, Scheduled, Delivered, Failed, Acknowledged, Canceled, and Stopped by completion/removal. Delivered is used only when delivery is confirmed; otherwise retain pending/failed status. In-App events can exist while the recipient is offline and appear on return. WhatsApp receipt is subject to actual delivery, not guaranteed by a scheduled status.

## 18. Recurring tasks

Recurrence is calendar-based, not “repeat after completion.” Only the task creator manages the series. The start date cannot be in the past. For weekly/custom patterns, the initial occurrence uses the first matching scheduled date on or after the start date; no task is created for intervening nonmatching days. Patterns are Daily, Weekly, Weekdays (Monday–Friday), Monthly, and Custom. Custom supports an interval of N days, N weeks with selected weekdays, or N months using a numbered day or ordinal weekday. N is a positive whole number.

A series requires a start date and timezone, defaults to no end, and can end on a date or after a specified positive number of occurrences. New series default to Weekly on the start date’s weekday. Monthly numbered days that do not exist use that month’s final day. A monthly fifth weekday uses the last matching weekday when there is no fifth occurrence. Recurrence dates stay in the series timezone.

The first matching occurrence is created when the series is saved, even when its deadline is in the future. Later occurrences appear at the start of their scheduled day, even if earlier work remains open. Each occurrence has its own status and deadline on that occurrence’s scheduled day. Missed occurrences are retained as distinct tasks on return; they are not merged or silently skipped.

Each new occurrence copies template title, notes, assignees, grants, and unchecked step titles. It starts Pending with Shared or All-required policy matching the template; all individual parts start Pending. It copies the creator’s template private/shared list placements only while those lists and the creator’s placement rights remain valid. Shared-list placement requires the series creator to remain the list owner. Other people’s private placement and Important flags do not copy.

Comments, activity, children, relationship links, and reminders do not copy. People can set reminders on each occurrence. Adding recurrence to an existing noncompleted root task makes that task the first occurrence and replaces its deadline with the first matching schedule date after confirmation; it does not create a duplicate initial task. Adding recurrence to a completed task requires reopening it first. Recurrence on child tasks is outside scope; a child cannot be turned into a series. Creating a series from a task that already has children is rejected until its children are detached.

Edits offer This occurrence or This and future. This occurrence changes only that task. This and future updates the selected occurrence and the future template; earlier occurrences remain unchanged. Changing a series to new assignees/policy applies assignment-reset rules to the selected occurrence. Stopping a series prevents future creation and preserves existing tasks. Deleting one occurrence does not stop the series; archive/delete confirmations state this explicitly.

## 19. Archive, delete, and access removal

Archive is reversible and shared: authorized people archive/unarchive the task for everyone. Archive preserves status, comments, and history; archived work is read-only until unarchived and appears only in the Archived collection. Reminder delivery stops and does not resume automatically after unarchive. Archiving a parent archives descendants after a scope confirmation; unarchive restores that same archived group. Archiving an occurrence does not stop its series.

Delete removes the task and its comments/activity from user access for everyone. There is no user-facing restore after deletion in this version. It requires confirmation explicitly stating that scope. Deleting a parent deletes descendants after a count/scope confirmation. Deleting a recurring task offers Delete this occurrence or Delete this and stop future occurrences; earlier occurrences survive.

Deleting a list, removing personal placement, and leaving a shared list never delete tasks. Loss of shared access removes the inaccessible task from search, saved views, private list results, and offline account content after the device receives the revocation. Previously exported WhatsApp text cannot be recalled.

## 20. Changing a contact’s phone number

A personal contact edit and a verified account change are different. Editing a contact number never changes the other person’s account or merges accounts.

Show old/new numbers and these two explicit choices:

- **Reassign all tasks:** Replace the old identity with the new identity on tasks created by the viewer, including completed/archived tasks. Other creators’ tasks are unchanged.
- **Keep as is:** Preserve all existing tasks under the old identity; future selection of this contact uses the new number.

Keep as is is the default. New numbers resolve to an existing active identity when registered, otherwise a dormant identity. Tasks retain original comment authors, activity actors, and historical events.

Reassign all preserves completed/archived state and transferred individual completion. If the new identity is already an assignee, keep one assignment; its part is complete if either old or new part was complete. The new identity receives the more restrictive combination of the two existing permission sets; the creator can subsequently change grants explicitly. Open all-required tasks recalculate overall progress.

Reminders owned by the viewer and addressed to the old task assignee are canceled during reassignment; they are not silently delivered to a different number. The viewer can create new reminders after confirmation. Reminders owned by others are stopped when their target assignment is removed; their owners receive a private in-app notice. Shared activity records only the reassignment, without exposing private reminder details.

The contact edit and selected task reassignment succeed as one operation. Offline changes remain Pending confirmation of shared changes; failure preserves the prior shared assignment and the requested edit for retry, without reporting completion. A successful reassignment can be reversed only through a new explicit reassignment; no hidden automatic rollback is offered.

Device-contact refresh detects a changed number only when the same device contact/number slot is identifiable. It requests the same history choice before retargeting assignments. A new or ambiguous number entry is treated as a separate contact; name matching alone never moves tasks.

## 21. Local-first reliability and conflicts

Task creation, permitted edits, personal organization, and comment drafts save locally immediately and survive app closure. Remote visibility and accepted changes require synchronization. Status wording must distinguish Saved locally, Syncing, Synced, Offline, and Sync failed.

Retries apply each logical change once. Failed changes remain recoverable. A queued permission/access-sensitive action is checked against current accepted rights when synchronized. Revoked rights cause rejection with a preserved private draft of the person’s unsent text, but no continued access to the revoked task’s saved content.

Changes to different task fields combine. Concurrent changes to the same field are not silently overwritten: retain the accepted shared value and show the affected editor both versions with Use shared version or Submit my change. Submitting again requires current permission and affects only that field. Comments append independently. All-required progress from different people combines; conflicting updates to the same person’s part use the same explicit conflict choice.

Concurrent assignment, permission, relationship, membership, or series changes require refreshing and retrying against the latest shared state. Deletion takes precedence over queued edits; they cannot recreate a deleted task. Archive rejects queued task edits until unarchived. Blockers and completion prerequisites are checked again before accepting completion.

While offline, cached access remains usable until the device learns it was revoked. Revocation is applied immediately on receipt. Logout removes all cached account content as defined in Section 3.

## 22. Preferences, access, and support

Essential capabilities are Tasks, Assigned to Me, Important, Lists & Views, Contacts, Profile/Settings, and Archived. Exact placement is a presentation choice; no capability can disappear because favorites grow.

Tasks, Lists & Views, and Profile/Settings remain directly reachable. Important and Assigned to Me start as favorites; people can favorite/unfavorite lists/views and those two collections. Favorites retain the person’s chosen pin order. Count meaning follows Sections 12 and 14.

Appearance supports Light, Dark, and System. Appearance and last-opened collection are device-specific and persist between launches. Remember Last View defaults On. When its collection is unavailable, open Tasks. The preference applies to tasks, assigned/important collections, lists, saved views, and Archived.

Contact aliases come from the local address book or personal manual entries; address-book data remains device-specific. Saved views, private lists, favorites/order, personal importance, and global/collection WhatsApp preferences synchronize within the same account. Device notification permission remains device-specific.

Support includes application version/build and a voluntary diagnostic-report share action. Diagnostics exclude task/comment text, personal contact content, message bodies, OTPs, credentials, and secrets. Sharing requires a deliberate user action.

The in-app activity area includes assignment notices, directly shared-list notices, rejected shared changes, and explicit reminders. Assignment and shared-list notices are informational; neither requires acceptance. System notifications are sent only for configured In-App reminders; this version does not send automatic push or WhatsApp messages for ordinary assignments, comments, or status changes.

## 23. Accessibility, empty states, and recovery

The product must work with enlarged text and screen readers. Every action needs an understandable label and state. Touch targets must be comfortably operable. Color alone cannot indicate completion, blocking, failure, importance, or dormant identity.

| Situation | Required outcome |
| --- | --- |
| No tasks | Explain capture and offer Create task. |
| No assigned work | Explain incoming assignments; retain Create task. |
| No lists/views | Explain purpose and offer creation. |
| No results | Show active restrictions and Clear search/filters. |
| No reminders/steps/children/assignees | Offer the relevant add action when authorized. |
| Dormant identity | Show Not on Karyavali yet; assignment remains valid. |
| Permission denied | Explain the exact unavailable action and retain unaffected work. |
| Blocked | Identify accessible blockers/unfinished children; mask restricted references. |
| Offline/pending | Keep saved work and distinguish pending shared effects. |
| Failed save/post/sync | Retain the person’s input, show reason, and offer Retry. |
| Deleted/no access | Remove normal actions, explain unavailability, and allow return. |
| WhatsApp unavailable | Keep prepared preview and Copy available. |
| OTP wrong/expired/unavailable | Allow number correction, code retry, and service-governed resend. |
| Invalid relationship or recurrence | Explain the violated rule without silently changing it. |
| Newly shared list | Show the list directly after synchronization; no Accept or Decline action. |

Every destructive or access-changing confirmation names the action, affected task/list/people or count, and consequence. Confirmation labels describe the actual action. Cancel leaves the accepted product state unchanged.

## 24. Acceptance examples

| Scenario | Required result |
| --- | --- |
| Create a title-only task | One Pending task; no mandatory assignee, date, or list. |
| Assign a task to an active contact | Assignment takes effect directly; no invitation or acceptance. |
| Assign a task to a dormant contact | Assignment takes effect directly and appears automatically after registration with that number. |
| Share a list with an active contact | Member access is granted directly; list appears after synchronization without acceptance. |
| Share a list with a dormant contact | Membership is granted directly; list appears automatically after registration without acceptance. |
| Tap Create repeatedly and reconnect | One logical task. |
| Edit, leave, and reopen offline | Saved local edits remain; unshared state is visible. |
| Mark a shared task Important | Only this viewer’s Important collection changes. |
| Put one task into two private lists | One task; shared updates remain consistent. |
| Delete a private list or saved view | Tasks survive. |
| Add received work to my private list | No change to creator organization or collaborator access. |
| Complete shared-mode work | One permitted person completes it for everyone. |
| Two of three all-required parts complete | Global In Progress, 2/3 completed; third part remains open. |
| Creator completes a dormant person’s part | Creator is recorded as the actor; dormant person is not falsely shown acting. |
| Add an assignee after partial all-required progress | New part Pending; existing parts retained; global progress recalculated. |
| Check all steps in all-required work | No person’s part completes automatically. |
| Complete a parent with unfinished children | Completion rejected with child-task explanation. |
| Reopen a blocker of completed work | Rejected until completed dependents reopen. |
| Delete an unfinished blocker | Dependents retain an Unavailable blocker restriction until its link is explicitly removed. |
| Try to add to someone else’s shared list | Placement unavailable; existing private organization is unaffected. |
| Remove list membership while directly assigned | Direct task access remains. |
| Delete a personal contact | Assignments remain; fallback naming applies. |
| Change contact number, Keep as is | Past assignments stay with old identity; future selection uses new number. |
| Reassign tasks to an already assigned person | One assignment; restrictive grants and completed-if-either-completed rule apply. |
| Open manual WhatsApp text | No delivery, acknowledgement, or completion inferred. |
| Schedule WhatsApp to a dormant/nonconsenting recipient | Scheduling unavailable; manual sharing remains available. |
| Save a reminder offline | Pending schedule, not Scheduled. |
| Acknowledge repeating reminder | Future deliveries stop; task status stays unchanged. |
| Complete task then reopen | Stopped reminders do not restart. |
| Monthly day 31 occurs in a shorter month | Occurrence uses the final day of that month. |
| Miss several recurring-task dates | Distinct missed occurrences remain; no silent skipping. |
| Concurrent edits change different fields | Both changes survive. |
| Concurrent edits change the same field | Explicit conflict choice; no silent overwrite. |
| Task access revoked while device offline | Cached access ends when revocation is received; rejected work is not published. |
| Batch includes blocked/unauthorized tasks | Eligible items change; skipped items and reasons are reported. |
| Log out with unsynced changes | Logout waits; data/session retained. |

## 25. Product boundaries that prevent misinterpretation

- Registration is mandatory for using the app; contact import is optional.
- Tasks are assigned directly to contacts and lists are shared directly. No invitation, acceptance, or recipient-approval workflow exists.
- Dormant recipients receive assignments and list membership before registration; these become available automatically when they register with the matching phone number.
- Dormant assignment is valid; dormant recipients do not perform in-app actions before registration.
- A WhatsApp group is not a Karyavali person or shared-list membership group.
- Shared task fields, private organization, and externally sent snapshots have different effects.
- Important is personal; title, notes, deadline, task status, and relationships are shared.
- A checklist step and a full child task are separate features with separate completion rules.
- Unblocking does not automatically complete a task.
- List membership grants read access only; task actions need direct grants or creator authority.
- A private list/view cannot expose someone else’s task or private information.
- Manual WhatsApp sharing and scheduled WhatsApp delivery are separate capabilities.
- An opened message is not delivered work, acknowledgement, or completion.
- Reminder acknowledgement is not task completion; reminder repetition is not task recurrence.
- Product optionality belongs to users; required capabilities are not optional implementation scope.
- This product reference defines behavior; screenshots supply visual context and do not override its rules.

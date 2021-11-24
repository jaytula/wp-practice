<?php
if(!is_user_logged_in()) {
  wp_redirect(esc_url(site_url('/')));
  exit;
}
?>
<?php get_header(); ?>

<?php while(have_posts()): ?>
    <?php the_post(); ?>
    <?php pageBanner(array(
      'subtitle' => 'Hello this is the subtitle',
    )) ?>

    <div class="container container--narrow page-section">
      <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input class="new-note-title" placeholder="Title">
        <textarea class="new-note-body" placeholder="Your note here..."></textarea>
        <span class="submit-note">Create Note</span>
        <span class="note-limit-message">Note limit reached: delete an existing note to make room for a new one.</span>
      </div>
      <ul class="min-list link-list" id="my-notes">
        <?php
        $notes_query = new WP_Query(array(
          'post_type' => 'note',
          'posts_per_page' => -1,
          'author' => get_current_user_id(),
        ));
        ?>
        <?php while($notes_query->have_posts()): ?>
          <?php $notes_query->the_post(); ?>
          <li data-id="<?php the_ID() ?>">
            <input readonly class="note-title-field" type="text" value="<?= str_replace('Private: ', '', esc_attr(get_the_title())) ?>">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
            <textarea readonly class="note-body-field"><?= esc_textarea(wp_strip_all_tags(get_the_content())) ?></textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
          </li>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
      </ul>
    </div>
<?php endwhile; ?>

<?php get_footer(); ?>
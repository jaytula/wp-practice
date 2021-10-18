<?php get_header(); ?>

<?php while(have_posts()): ?>
    <?php the_post(); ?>
    <?php pageBanner(array(
      'subtitle' => 'Hello this is the subtitle',
    )) ?>

    <div class="container container--narrow page-section">
      <?php $parent_id = wp_get_post_parent_id(get_the_ID()); ?>
      <?php if($parent_id): ?>
      <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
          <a class="metabox__blog-home-link" href="<?php echo get_permalink($parent_id)?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($parent_id) ?></a> <span class="metabox__main"><?php the_title() ?></span>
        </p>
      </div>
      <?php endif; ?>

      <?php
      $test_array = get_pages(array(
        'child_of' => get_the_ID()
      ));
      ?>
      <?php if($parent_id or $test_array): ?>
      <div class="page-links">
        <h2 class="page-links__title"><a href="<?php get_the_permalink($parent_id) ?>"><?php echo get_the_title($parent_id) ?></a></h2>
        <ul class="min-list">
          <?php 
          $child_of = $parent_id ? $parent_id : get_the_id();
          wp_list_pages(array(
            'title_li' => null,
            'child_of' => $child_of,
            'sort_column' => 'menu_order'
          )); 
          ?>
        </ul>
      </div>
      <?php endif; ?>

      <div class="generic-content">
        <?php the_content() ?>
      </div>
    </div>
<?php endwhile; ?>

<?php get_footer(); ?>
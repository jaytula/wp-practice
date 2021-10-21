<?php
get_header();
pageBanner(array(
  'title' => 'Search Results',
  'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;',
));
?>

<div class="container container--narrow page-section">
  <?php if(!have_posts()): ?>
    <h2 class="headline headline--small-plus">No results match that search.</h2>
  <?php endif; ?>
  <?php while (have_posts()) : ?>
    <?php the_post(); ?>
    <?php get_template_part('template-parts/content', get_post_type()); ?>
  <?php endwhile; ?>
  <?php echo paginate_links() ?>
  <?php get_search_form() ?>
</div>

<?php get_footer(); ?>
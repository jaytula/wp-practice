<?php 

get_header();
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'See what is going on in our world',
));
?>

<div class="container container--narrow page-section">
    <?php while (have_posts()) : ?>
        <?php the_post(); ?>
        <?php get_template_part('template-parts/content-event'); ?>
    <?php endwhile; ?>
    <?php echo paginate_links() ?>
    <hr class="section-break">
    <p>Looking for a recap of past events? <a href="<?= site_url('past-events') ?>">Check out our past events archive</a>.
</div>

<?php get_footer(); ?>
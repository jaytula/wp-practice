<?php get_header(); ?>

<?php while(have_posts()): ?>
    <?php the_post(); ?>
    <h1>This is a page, not a post</h1>
    <h2><?php the_title(); ?></h2>
    <?php the_content() ?>
<?php endwhile; ?>

<?php get_footer(); ?>
<?php get_header(); ?>

<?php
$likeCount = new WP_Query(array(
    'post_type' => 'like',
    'meta_query' => array(array(
        'key' => 'liked_professor_id',
        'compare' => '=',
        'value' => get_the_ID(),
        'type' => 'numeric'
    ))
));

$existsQuery = new WP_Query(array(
    'author' => get_current_user_id(),
    'post_type' => 'like',
    'meta_query' => array(
       array(
        'key' => 'liked_professor_id',
        'compare' => '=',
        'value' => get_the_ID(),
        'type' => 'numeric'
       ),
    )
));

$existsStatus = $existsQuery->found_posts ? 'yes' : 'no';
?>

<?php while (have_posts()) : ?>
    <?php the_post(); ?>
    <?php pageBanner(); ?>
    <div class="container container--narrow page-section">
        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
                    <?php the_post_thumbnail('professorPortrait') ?>
                </div>
                <div class="two-thirds">
                    <span class="like-box" data-exists="<?= $existsStatus ?>">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <i class="fa fa-heart" aria-hidden="true"></i>
                        <span class="like-count"><?= $likeCount->found_posts ?></span>
                    </span>
                    <?php the_content() ?>
                </div>
            </div>
        </div>
        <?php $related_programs = get_field('related_programs'); ?>
        <?php if ($related_programs) : ?>
            <hr class="section-break">
            <h2 class="headline headline--medium">Subjects(s) Taught</h2>
            <ul class="link-list min-list">
                <?php foreach ($related_programs as $program) : ?>
                    <li><a href="<?= get_the_permalink($program) ?>"><?= get_the_title($program) ?></a></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
<?php endwhile; ?>

<?php get_footer(); ?>
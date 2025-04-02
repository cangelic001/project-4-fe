import CardBasic from "../CardBasic/CardBasic";

function CardLanding() {

    const cardData = [
        {
          title: "Create Logs",
          text: "Unlock your thoughts, discover your purpose, and celebrate your growth! Every journal entry is a joyful step toward becoming the best version of you!"
        },
        {
          title: "View Logs",
          text: "Look back at your journey with pride, celebrate how far you’ve come, and embrace the lessons you’ve learned. Each past entry is a reminder of your growth, strength, and all the amazing progress you’ve made!"
        },
        {
          title: "Track Stats",
          text: "Track your emotions, moods, and sentiments with pride! Every statistic is a powerful reflection of your growth, helping you understand yourself better and celebrate the small victories along the way."
        }
      ];

    return (
        <>
            {cardData.map((card, index) => (
                    <div  key={index} style={{ margin: '50px'}}>
                        <CardBasic
                            title={card.title}
                            text={card.text}
                        />
                    </div>
                ))}
        </>
    )
}

export default CardLanding;
# A simple algorithm for language detection

**Available as website at: [https://tadeohepperle.github.io/2021-09-02-sprache-automatisch-erkennen/](https://tadeohepperle.github.io/2021-09-02-sprache-automatisch-erkennen/)**
Letting the computer recognize languages is easier than you think, does not require neural networks and can be achieved with only about 5000 characters of training text for each language. The algorithm is purely based on letter frequencies and word length distribution.

## How does it work?

## Language Similarities

<h3>How does it work?</h3>
              <ol>
                <li>
                  <p>
                    Calculate fingerprint for traning text in each language. It
                    consists of about 40 attributes and will be used will look
                    like this:
                  </p>
                  <p>
                    <code>
                      { 'wordLength_2': 0.06025641025641026,
                      <br />'wordLength_3': 0.29102564102564105,<br />
                      'wordLength_4': 0.11794871794871795, <br />... <br />'d':
                      0.05472752678155566, <br />'e': 0.17210060549604098,
                      <br />'ä': 0.006287843502561714 }
                    </code>
                  </p>
                  <p>
                    Attributes of the fingerprint are letter frequencies and
                    word length frequencies calculated from the training text.
                  </p>
                </li>
                <li><p>Calculate fingerprint for input text.</p></li>
                <li>
                  <p>
                    Calculate attribute distances for each attribute between
                    input and each language. The attribute distance is just the
                    ratio (>1) between input attribute and language attribute.
                    The attribute similarity is 1 divided by this attribute
                    distance.
                  </p>
                  <p>
                    Example:<br />
                    <code>
                      attr1_input = 0.15 <br />attr1_lang1 = 0.45 <br />
                      attr1_distance = 0.45 / 0.15 = 3 <br />
                      attr1_similarity = 1 / 3 = 0.3333
                    </code>
                  </p>
                </li>
                <li>
                  <p>
                    For each attribute norm the sum of attribute similarities
                    between input and all languages to 1. This way we ensure
                    each attribute has the same influence on the prediction.
                  </p>
                  <p>
                    Example:<br />
                    <code>
                      attr1_similarity_lang1 = 0.3333 <br />
                      attr1_similarity_lang2 = 0.8 <br />
                      attr1_similarity_lang3 = 0.3667 <br />
                      sum = 0.3333 + 0.8 + 0.3667 = 1.5 <br />
                      attr1_similarity_lang1 = 0.3333 / 1.5 = 0.2222<br />
                      attr1_similarity_lang2 = 0.8 / 1.5 = 0.5333<br />
                      attr1_similarity_lang3 = 0.3667 / 1.5 = 0.2445<br />
                      <b class="text-success"
                        >--> attr1_similarity_lang1 + attr1_similarity_lang2 +
                        attr1_similarity_lang3 = 1</b
                      >
                    </code>
                  </p>
                </li>
                <li>
                  <p>
                    For each language add up attribute similarities to get the
                    score for this language. The language with the highest score
                    is predicted to be the language of the input.
                  </p>
                </li>
                <li>
                  <p>
                    <i>(optional)</i> Norm language scores to a value range
                    between 0 and 1.
                  </p>
                </li>
              </ol>
